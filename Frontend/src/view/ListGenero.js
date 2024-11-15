import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";


const baseUrl = "http://localhost:3002";

export default function ListGenero() {
    const [dataGenero, setdataGenero] = useState([]);

    useEffect(() => {
        LoadGenero();
    }, []);

    function LoadGenero() {
		const url = baseUrl+"/genero/list";
		axios.get(url)
			.then(res => {
                console.log(res.data.sucess)
				if (res.data.sucess) {
					const data = res.data.data;
                
					setdataGenero(data);
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Error Web Service!'
					});
				}
			})
			.catch(error => {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: error.message
				});
			});
	}

    


    function LoadFillData() {
        return dataGenero.map((data, index) => {
            return (
                <tr key={index}>
                    <th>{data.id}</th>
                    <td>{data.description}</td>
                    <td>
                        <Link className='btn btn-outline-info' to={"/genero/update/" + data.id}>Update</Link>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' onClick={() => onDelete(data.id)}>Delete</button>
                    </td>
                </tr>
            )
        });
    }

    function onDelete(genero) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'It won\'t be able to recover it later!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete!',
            cancelButtonText: 'No, keep'
        }).then((result) => {
            if (result.value) {
                sendDelete(genero)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Canceled',
                    'Genre was not deleted',
                    'error'
                )
            }
        })
    }

    function sendDelete(userId) {
        const url = `${baseUrl}/genero/delete/${userId}`;
        axios.get(url)
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Genre was removed.',
                        'success'
                    )
                    LoadGenero();
                } else {
                    Swal.fire(
                        'Canceled',
                        'Genre is associated to a movie!',
                        'error'
                    )
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }

    
    return (
        <table className="table table-hover table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Genero</th>
                </tr>
            </thead>
            <tbody>
                <LoadFillData />
            </tbody>
        </table>
    );

 
}
