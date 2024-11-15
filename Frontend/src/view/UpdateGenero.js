import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from "axios";
import React ,{useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const baseUrl = "http://localhost:3002";

export default function UpdateGenero(){

    const [Genero, setGenero] = useState("");
    const [Descricao, setDescricao] = useState("");

    const { generoId } = useParams();

    useEffect(() => {
        const url = baseUrl + "/genero/get/" + generoId;

        axios.get(url)
        .then(res => {
            if (res.data.success) {
                const data = res.data.data[0];
                setGenero(data);
                setDescricao(data.description);
            }
            else {
                alert("Error web service")
            }
        })
        .catch(error => {
            alert("Error server: " + error)
        })
    }, [generoId]);

    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Descricao:</label>
                    <input type="text" className="form-control" placeholder=""
                    value={Descricao} onChange={(value)=>
                    setDescricao(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2" onClick={()=>SendUpdate()}>Update</button>
        </div>
    );

    function SendUpdate(){
        const url = baseUrl + "/genero/update/" + generoId
        console.log(Descricao)
        const datapost = {
            description : Descricao
        }
        axios.put(url, datapost)
        .then(response => {
            if (response.data.success === true) {
                alert(response.data.message)
            }
            else {
                alert("Error updating")
            }
        }).catch(error=>{
            alert("Error 34: " + error)
        })
    }
}
