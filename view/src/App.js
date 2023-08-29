import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Masuk from "./pages/masuk"
import Login2 from './pages/login2';
import Pertengahan from './pages/pertengahan';
import Keluar from './pages/Keluar';
import CreateMasuk from './pages/createMasuk';
import CreateKeluar from './pages/createKeluar';
import EditMasuk from './pages/editMasuk';
import EditKeluar from './pages/editKeluar';
import Header from './components/header';


function App() {
  const role = localStorage.getItem('role');
  return (
    <>
      <Router>
      { role && <Header />}
        <div className="container">
        <Routes>
          <Route path = "/" element = {<Login2 />} />
          <Route path = "/pertengahan" element = {<Pertengahan />} />
          <Route path = "/masuk" element = {<Masuk />} />
          <Route path = "/keluar" element = {<Keluar />} />
          <Route path = "/create1" element = {<CreateMasuk />} />
          <Route path = "/create2" element = {<CreateKeluar />} />
          {role === 'admin' && <Route path = "/edit1/:id" element = {<EditMasuk />} />}
          {role === 'admin' && <Route path = "/edit2/:id" element = {<EditKeluar />} />}
        </Routes>
        </div>
      </Router>
    </>
  );
}


export default App;
