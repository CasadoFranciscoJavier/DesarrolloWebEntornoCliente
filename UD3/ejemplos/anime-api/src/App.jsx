import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Animes from './pages/Animes';
import Top10 from './pages/Top10';
import Random from './pages/Random';
import DetalleAnime from './pages/DetalleAnime';
import './App.css'

function App() {
  return (
    <Router>
      {/* Barra de navegación con enlaces dinámicos */}
      <nav>
        <Link to="/">Home </Link>
        <Link to="/top10">Top 10 </Link>
        <Link to="/random">Random</Link>
      </nav>

      {/* Definición de rutas */}
      <Routes>
        <Route path="/" element={<Animes />} />
        <Route path="/top10" element={<Top10 />} />
       <Route path="/random" element={<Random />} /> 
        <Route path="/anime/:id" element={<DetalleAnime />} />
      </Routes>
    </Router>
  );
}

export default App;