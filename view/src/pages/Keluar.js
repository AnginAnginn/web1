import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Keluar() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    await navigate("/create2");
  };

  const role = localStorage.getItem('role');

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/item/keluar");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = async (id) => {
    await navigate(`/edit2/${id}`, {
      headers: { role },
    })
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/item/keluar/${id}`); 
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <Fragment>
      <div className='container'>
        <h2>Keluar</h2>
        <div style={{ margin: "1rem" }}>
          <button type="button" class="btn btn-success" onClick={handleAdd}>Add New Product</button>
        </div>
        <div className='table-scroll'>
        <table class="table table-bordered table-striped table-dark">
          <thead>
            <tr>
              <th>No</th>
              <th>Merk</th>
              <th>Harga Beli</th>
              <th>Harga Jual</th>
              <th>Keuntungan</th>
              <th>foto</th>
              <th>Tanggal</th>
              {role === 'admin' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) =>
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.merk}</td>
                <td>{item.hargaBeli}</td>
                <td>{item.hargaJual}</td>
                <td>{item.keuntungan}</td>
                <td>{item.foto && <img src={item.foto} alt={item.merk} width="100" />}</td>
                <td>{item.tanggal}</td>
                {role === 'admin' && <td>
                  <button type="button" class="btn btn-primary" onClick={() => handleEdit(item._id)} style={{margin: "1rem"}}>
                    Edit
                  </button>
                  <button type="button" class="btn btn-danger" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </td>} 
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </Fragment>
  );
}

export default Keluar