import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const baseUrl = "http://localhost:3002";

export default function ListFilme() {
  const [Filme, setFilme] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3002/filme/list";
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setFilme(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <table className="table table-hover table-striped">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Titulo</th>
          <th scope="col">Fotos</th>
          <th scope="col">Descição</th>
          <th scope="col">Género</th>
          <th colSpan="2">Ação</th>
        </tr>
      </thead>
      <LoadFillData />
    </table>
  );

  function LoadFillData() {
    return (
      <tbody>
        {Filme.map((data, index) => (
          <tr key={index}>
            <th>{data.id}</th>
            <td>{data.title}</td>
            <td>
              <img 
                src={`${baseUrl}/uploads/${data.photo}`} 
                alt={data.photo} 
                width={50} 
                height={50}/>
            </td>
            <td>{data.description}</td>
            <td>{data.genero ? data.genero.description : 'No Genre'}</td>
            <td>
              <Link className="btn btn-secondary" to={"/update/" + data.id}>Update</Link>
            </td>
            <td>
              <button className="btn btn-danger" onClick={() => onDelete(data.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  function onDelete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to view it afterwards!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        sendDelete(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Canceled',
          'Movie was not deleted',
          'error'
        );
      }
    });
  }

  function sendDelete(userId) {
    const url = `${baseUrl}/filme/delete/${userId}`;
    axios.post(url)
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            'Deleted!',
            'The movie has been removed',
            'success'
          );
          // Refresh the list after deletion
          setFilme(Filme.filter(filme => filme.id !== userId));
        }
      })
      .catch(error => {
        alert("Error 325");
      });
  }
}
