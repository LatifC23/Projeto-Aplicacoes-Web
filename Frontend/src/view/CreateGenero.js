import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";

const baseUrl = "http://localhost:3002";

export default function CreateGenero() {
    console.log("Calling me!")
	
    const [Descricao, setDescricao] = useState();
   

   
    function SendSave(){
        console.log("Saving...")
        if (Descricao === 0) {
            alert("Add a Descricao!")
        }
        else {
            const url = baseUrl + "/genero/create"
            const datapost = {
                description : Descricao
            }
            axios.post(url, datapost)
            .then(response => {
                if (response.data.sucess===true) {
                        alert(response.data.message)
                }
                else {
                        alert(response.data.message)
                }
            })
            .catch(error=>{
                alert("Error 34 " + error)
            })
        }
    }
   
    return(
        <div>
            <div className='form-row justify-content-center'>
                <div className='form-group col-md-6'>
                    <label htmlFor="inputPassword4">Descricao:</label>
                    <input type="text"
                    className="form-control"
                    placeholder=""
                    value={Descricao} onChange={value=>
                        setDescricao(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2" onClick={()=>SendSave()}>Add</button>
        </div>
    );

}
