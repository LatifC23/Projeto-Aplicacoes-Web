import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:3002";

export default function CreateFilme() {
  const [Titulo, setTitulo] = useState("");
  const [Foto, setFoto] = useState("");
  const [Genero, setGenero] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [dataGenero, setDataGenero] = useState([]);

  useEffect(() => {
    const url = baseUrl + "/genero/list";
    axios
      .get(url)
      .then((res) => {
        console.log(res.data)
        if (res.data.sucess === true) {
          const data = res.data.data;
          setDataGenero(data);
        } else {
          alert("Erro Web Service listar genero");
        }
      })
      .catch((error) => {
        alert("Erro1:" + error);
      });
  }, []);
  return (
    <div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={Titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Photo</label>
          <input
            type="text"
            className="form-control"
            placeholder="Insert a Foto"
            value={Foto}
            onChange={(event) => setFoto(event.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputState">Genre</label>
          <select
            id="inputState"
            className="form-control"
            value={Genero}
            onChange={(event) => setGenero(event.target.value)}>
            <option value="">Selecione..</option>
            {LoadGenero()}
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Description:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={Descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-2" onClick={SendSave}>
        Add Movie
      </button>
    </div>
  );

  function LoadGenero() {
    return dataGenero.map((data, index) => {
      return (
        <option key={index} value={data.id}>
          {data.description}
        </option>
      );
    });
  }

  function SendSave() {
    if (Genero === 0) {
      alert("Select Genero!");
    } else if (Titulo === "") {
      alert("Choose a Titulo!");
    } else if (Foto === "") {
      alert("Insert a Foto!");
    } else if (Descricao === "") {
      alert("Write a Descricao");
    } else {
      const url = baseUrl + "/filme/create";
      const datapost = {
        title: Titulo,
        photo: Foto,
        genreID: Genero,
        description: Descricao,
      };
      axios
        .post(url, datapost)
        .then((response) => {
          if (response.data.success === true) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          alert("Error 34 " + error);
        });
    }
  }
}
