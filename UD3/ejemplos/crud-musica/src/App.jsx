import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListarAutores from './pages/ListarAutores';
import CrearAutor from './pages/CrearAutor';
import EditarAutor from './pages/EditarAutor';
import DetalleAutor from './pages/DetalleAutor';
import './App.css'


function App() {
  return (
    <Router>
      {/* Barra de navegación con Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fija">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            CRUD_MÚSICA 
          </Link>
          <div className="navbar-nav">
            <Link to="/" className="nav-link">Autores</Link>
            <Link to="/autores/nuevo" className="nav-link">Registar Autor</Link>
          </div>
        </div>
      </nav>

      {/* Definición de rutas */}
      <Routes>
        <Route path="/" element={<ListarAutores />} />
        <Route path="/autores/nuevo" element={<CrearAutor />} />
        <Route path="/autores/:id" element={<DetalleAutor />} />
        <Route path="/autores/:id/edit" element={<EditarAutor />} />
      </Routes>
    </Router>
  );
}

export default App;