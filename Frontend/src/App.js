import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link, Routes }from "react-router-dom";

import CreateFilme from './view/CreateFilme';
import CreateGenero from './view/CreateGenero';
import ListFilme from './view/ListFilme';
import ListGenero from './view/ListGenero';
import UpdateFilme from './view/UpdateFilme';
import UpdateGenero from './view/UpdateGenero';
import Main from "./view/filmeMain";



function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className='navbar-brand' to = '/'>MyMovies</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             
              <li style={{ marginRight: '10px' }}>
                <Link className="btn btn-outline-secondary" to="/ListFilme">Filmes</Link>
              </li>
              <li style={{ marginRight: '10px' }}>
                <Link className="btn btn-outline-secondary" to="/form">Add Filme</Link>
              </li>
              <li style={{ marginRight: '10px' }}>
                <Link className="btn btn-outline-secondary" to="/form-genero">Add Genero</Link>
              </li>
              <li style={{ marginRight: '10px' }}>
                <Link className="btn btn-outline-secondary" to="/genero">Generos</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container py-4">
          <div className="row">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/ListFilme" element={<ListFilme />} />
              <Route path="/form" element={<CreateFilme />} />
              <Route path="/form-genero" element={<CreateGenero />} />
              <Route path="/genero" element={<ListGenero />} />
              <Route path="/genero/update/:generoId" element={<UpdateGenero />} />
              <Route path="/update/:filmeId" element={<UpdateFilme />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
