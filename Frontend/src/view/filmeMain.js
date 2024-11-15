
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export default function ListComponent() {
  const [dataFilme, setdataFilme] = useState([]);
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    LoadFilme();
    const intervalId = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex % 5) + 1);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  function LoadFilme() {
    const url = "http://localhost:3002/filme/list";
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setdataFilme(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function SendDelete(userId) {
    const baseUrl = "http://localhost:3002/filme/delete";
    axios
      .post(baseUrl, {
        id: userId,
      })
      .then((response) => {
        if (response.data.success) {
          Swal.fire("Deleted!", "Your Filme has been deleted.", "success");
        }
        LoadFilme();
      })
      .catch((error) => {
        alert("Error 325 ");
      });
  }

  function OnDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        SendDelete(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }

  function LoadFillData() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {dataFilme.map((data, index) => (
          <div key={index} style={{ width: "25%", marginBottom: "20px", textAlign: "center" }}>
            <div style={{ maxWidth: "200px", margin: "0 auto" }}>
              <img
                src={`images/${data.photo}`}
                alt="No image"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <p>{data.title}</p>
          </div>
        ))}
      </div>
    );
  }
  

  function plusSlides(n) {
    setSlideIndex((prevIndex) => {
      const newIndex = prevIndex + n;
      return newIndex > 5 ? 1 : newIndex < 1 ? 5 : newIndex;
    });
  }

  function currentSlide(n) {
    setSlideIndex(n);
  }

  return (
    <div>
      <header>
        <div className="slideshow">
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className="mySlides"
              style={{ display: index + 1 === slideIndex ? "block" : "none" }}
            >
              <img
                src={`images/img${index + 1}.jpg`}
                alt="No image"
                style={{ width: "100%" }}
              />
            </div>
          ))}
          <button className="prev" onClick={() => plusSlides(-1)}>
            &#10094;
          </button>
          <button className="next" onClick={() => plusSlides(1)}>
            &#10095;
          </button>
          <div id="dots">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`dot ${index + 1 === slideIndex ? "active" : ""}`}
                onClick={() => currentSlide(index + 1)}
              ></span>
            ))}
          </div>
        </div>
        <br />
      </header>
      <LoadFillData></LoadFillData>
    </div>
  );
}
