import React from 'react';
import { useNavigate, } from 'react-router-dom';

function Pertengahan() {
    const navigate = useNavigate();

    const handleMasuk = async () => {
        await navigate("/masuk")
    };
    const handleKeluar = async () => {
        await navigate("/keluar")
    }


  return (
    <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
        <button className="btn btn-primary"  style={{margin: '1rem',}} onClick={handleMasuk}>masuk</button>
        <button className="btn btn-success" onClick={handleKeluar}>keluar</button>
    </div>
  )
}

export default Pertengahan