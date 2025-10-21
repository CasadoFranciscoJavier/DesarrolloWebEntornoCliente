import reverso from './img/reverso.jpg'
import './App.css'


function Card({ carta, volteada, onClick }) {
  const imagenCarta = volteada
    ? new URL(`./img/${carta.imagen}`, import.meta.url).href : reverso

  let contenido
  contenido = (
    <div className="carta" onClick={onClick}>
      <img src={imagenCarta} alt={carta.nombre} />
    </div>
  )

  return contenido
}

export default Card
