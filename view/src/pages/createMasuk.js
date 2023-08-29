import React, {useState} from 'react';
import {Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate} from "react-router-dom";
import axios from 'axios'

function CreateMasuk() {
    const [merk, setMerk] = useState('');
    const [hargaBeli, setHargaBeli] = useState('');
    const [hargaJual, setHargaJual] = useState('');
    const [minus, setMinus] = useState('');
    const [foto, setFoto] = useState([]);

    const navigate = useNavigate();

    const handleFileChange = async(e) => {
        e.preventDefault();
        try{
            const file = await e.target.files[0];
            setFoto(file);
        }catch (error){ 
            if(error.response){
                console.error(error.response.data.message)
            }
        }
    };

    const handleAdd = async(e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("merk", merk);
            formData.append("hargaBeli", hargaBeli);
            formData.append("hargaJual", hargaJual);
            formData.append("minus", minus);
            formData.append("foto", foto);
    
            await axios.post("http://127.0.0.1:5000/item/createmasuk", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
            navigate("/masuk");
            
        } catch (error) {
            if(error.response){
                console.error(error.response.data.message)
            }
        }
    }

    


  return (
    <div className='container'>
        <h2>Add Masuk</h2>
        <Form onSubmit ={CreateMasuk} className = "d-grid gap-2" >
            <label>Merk</label>
            <Form.Group>
                <Form.Control 
                type="text" placeholder="Merk apa?" required onChange={(e) => setMerk(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <label>Harga Beli</label>
            <Form.Group>
                <Form.Control 
                type="text" placeholder="Berapa harga belinya?" required onChange={(e) => setHargaBeli(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <label>Harga Jual</label>
            <Form.Group>
                <Form.Control 
                type="text" placeholder="Berapa harga jualnya?" required onChange={(e) => setHargaJual(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <label>Minus</label>
            <Form.Group>
                <Form.Control 
                type="text" placeholder="Apa saja minusnya?" required onChange={(e) => setMinus(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <label>Foto</label>
            <Form.Group>
                <Form.Control 
                type="file" required onChange={(e) => handleFileChange(e)}>
                </Form.Control>
            </Form.Group>
            <div><a></a></div>
            <div><a></a></div>
            <button className='btn btn-success' onClick={(e) => handleAdd(e)} type="submit">Submit</button>
        </Form>

    </div>
  )
}

export default CreateMasuk