import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from "axios";
import React ,{useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const baseUrl = "http://localhost:3002";

export default function UpdateFilme(){

    const [Filme, setFilme] = useState("");
    const [Titulo, setTitulo] = useState("");
    const [Foto, setFoto] = useState("");
    const [Genero, setGenero] = useState("");
    const [Descricao, setDescricao] = useState("");
    const [dataGenero, setdataGenero] = useState([]);

    const { filmeId } = useParams();

    useEffect(() => {

        const url = baseUrl+"/filme/get/"+filmeId;
        axios.get(url)
        .then(res => {
            console.log(res.data.success + " ttt");
            if(res.data.success){
                const data = res.data.data[0];
                setFilme(data);
                setTitulo(data.title);
                setFoto(data.photo);
                setDescricao(data.description);
                setGenero(data.description);
            }
            else{
                alert("Error web service nao pode actualizar filme")
            }
        })
        .catch(error => {
            alert("Error server: " +  error + "filme nao actualizado" );
        })

        const urlgenero = baseUrl + "/genero/list";
        axios.get(urlgenero)
        .then(res => {
            console.log(res); // Adicione este log para verificar a resposta completa
            if (res.data.sucess){
                const data = res.data.data;
                setdataGenero(data);
            }
            else {
                console.error("Erro na resposta do Web Service:", res.data.message); // Mensagem de erro mais detalhada
                alert("Erro Web Service: " + res.data.message); // Mensagem de erro mais detalhada

            }
        })
        .catch(error => {
            console.error("Erro ao fazer a requisição:", error); // Log do erro
            alert("Erro ao fazer a requisição: " + error); // Mensagem de erro mais detalhada
        });


    }, []);

    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Titulo</label>
                    <input type="text" className="form-control" placeholder="Title"
                    value={Titulo} onChange={(value)=>
                        setTitulo(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Inserir foto:</label>
                    <input type="text" className="form-control" placeholder="Path foto"
                    value={Foto} onChange={(value)=>
                        setFoto(value.target.value)}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Genero</label>
                    <select id="inputState" className="form-control" value = {Genero}
                    onChange={(value)=> setGenero(value.target.value)}>
                        <option default>Genero</option>
                        <LoadFillData/>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Descricao:</label>
                    <input type="text" className="form-control" placeholder="Description"
                    value={Descricao} onChange={(value) =>
                        setDescricao(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2" onClick={()=>SendUpdate()}>Update</button>
        </div>
    );

    function SendUpdate(){
        const url = baseUrl+"/filme/update/"+filmeId
        const datapost = {
            title : Titulo,
            photo : Foto,
            description : Descricao,
            genreID : Genero,
            
        }
        console.log(datapost)
        axios.put(url, datapost)
        .then(response=>{
            if (response.data.success === true) {
                alert(response.data.message)
            }
            else {
                alert("Error")
            }
        })
        .catch(error=>{
            alert("Error 34: " + error)
        })
    }

    function LoadFillData(){
        return dataGenero.map((data, index) => {
            return(
            <option key={index} value={data.id}>{data.description}</option>
        )
        });
    }
}
