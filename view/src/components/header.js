import React from 'react';
import { FaSignOutAlt, FaFortAwesomeAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            // Menghapus token autorisasi dari local storage
            localStorage.removeItem('role');

            navigate("/");
            
            // Tambahkan kode lain yang mungkin diperlukan setelah logout
    
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

  return (
    <header className='header' >

        <ul>
            <li>
                <Link to='/pertengahan'><FaFortAwesomeAlt size={29} /></Link>
            </li>
        </ul>
        <ul>
            <li>
                <Link to='/' onClick={handleLogout}><FaSignOutAlt />Logout</Link>
            </li>
        </ul>

    </header>
  )
}

export default Header