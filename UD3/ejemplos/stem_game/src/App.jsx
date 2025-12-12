import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListarCompanias from './pages/ListarCompanias.jsx';
import CrearCompania from './pages/CrearCompania.jsx';
import DetalleCompania from './pages/DetalleCompania.jsx';
import EditarCompania from './pages/EditarCompania.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🎮 STEM Game
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Compañías
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/companias/nuevo">
                  Nueva Compañía
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ListarCompanias />} />
        <Route path="/companias/nuevo" element={<CrearCompania />} />
        <Route path="/companias/:id" element={<DetalleCompania />} />
        <Route path="/companias/:id/edit" element={<EditarCompania />} />
      </Routes>
    </Router>
  )
}

export default App
