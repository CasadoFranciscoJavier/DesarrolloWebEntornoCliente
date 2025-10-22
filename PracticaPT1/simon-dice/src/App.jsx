import { useEffect, useState } from 'react'
import coloresSimon from "./coloresSimon.json";
import azul from "./img/azul.png"
import amarillo from "./img/amarillo.png"
import rojo from "./img/rojo.png"
import verde from "./img/verde.png"
import "./SimonDice.css"; // Archivo CSS para estilos

function getRandomInt(min, max) {
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.floor(Math.random() * (max - min + 1) + min);
}

const coloresImagenes = {
 "azul": azul,
 "amarillo": amarillo,
 "rojo": rojo,
 "verde": verde,
}

const coloresArray = ["azul", "amarillo", "rojo", "verde"]

function SimonDice() {

 const [secuenciaSimon, setSecuenciaSimon] = useState([])
 const [secuenciaUsuario, setSecuenciaUsuario] = useState([])
 const [estaJugando, setEstaJugando] = useState(false)
 const [turnoSimon, setTurnoSimon] = useState(false)
 const [mensajeJuego, setMensajeJuego] = useState("Presiona 'Iniciar Juego'")
 const [indiceUsuario, setIndiceUsuario] = useState(0)


 // Usa este efecto para iniciar el turno de Simon cuando cambia la secuencia (después de iniciar o acertar)
 useEffect(() => {
  if (secuenciaSimon.length > 0 && !estaJugando) {
   setEstaJugando(true)
   setTurnoSimon(true)
   setMensajeJuego("¡Observa la secuencia!")
   setSecuenciaUsuario([])
   setIndiceUsuario(0)
  }
 }, [secuenciaSimon])

 // Usa este efecto para simular el parpadeo de la secuencia de Simon
 useEffect(() => {
  if (turnoSimon) {
   const temporizador = setTimeout(() => {
    setTurnoSimon(false)
    setMensajeJuego("¡Tu turno!")
   }, secuenciaSimon.length * 1000 + 500) // Un tiempo basado en la longitud de la secuencia

   return () => clearTimeout(temporizador)
  }
 }, [turnoSimon])


 function iniciarJuego() {
  setSecuenciaSimon([])
  setSecuenciaUsuario([])
  setIndiceUsuario(0)
  setEstaJugando(false)
  agregarColorASecuencia()
  setMensajeJuego("Iniciando juego...")
 }

 function agregarColorASecuencia() {
  let indiceAleatorio = getRandomInt(0, coloresArray.length - 1)
  let nuevoColor = coloresArray[indiceAleatorio]
  setSecuenciaSimon([...secuenciaSimon, nuevoColor])
 }

 function manejarClickColor(colorPresionado) {
  if (!turnoSimon && estaJugando) {
   setSecuenciaUsuario([...secuenciaUsuario, colorPresionado])
   comprobarColor(colorPresionado)
  }
 }

 function comprobarColor(color) {
  // Verifica si el color presionado coincide con el color actual de la secuencia de Simon
  if (color == secuenciaSimon[indiceUsuario]) {
   let nuevoIndice = indiceUsuario + 1
   setIndiceUsuario(nuevoIndice)

   // Comprueba si el usuario ha completado toda la secuencia
   if (nuevoIndice == secuenciaSimon.length) {
    setMensajeJuego("¡Correcto! Preparando el siguiente nivel...")

    // Añade un nuevo color para el siguiente nivel
    const temporizador = setTimeout(() => {
     setEstaJugando(false)
     agregarColorASecuencia()
    }, 1000)

    return () => clearTimeout(temporizador)
   }
  } else {
   setEstaJugando(false)
   setTurnoSimon(false)
   alert("¡Juego Terminado! Nivel alcanzado: " + secuenciaSimon.length)
   setSecuenciaSimon([])
   setSecuenciaUsuario([])
   setIndiceUsuario(0)
   setMensajeJuego("Presiona 'Iniciar Juego' para volver a empezar")
  }
 }


 function obtenerClaseColor(color, indice) {
  let clase = "color-simon"
  let colorActual = secuenciaSimon[indice]

  if (turnoSimon && color == colorActual) {
   clase = clase + " activo"
  }

  return clase
 }

 return (
  <div>
   <h1>Simon Dice</h1>

   <div>
    <p>Nivel: {secuenciaSimon.length}</p>
    <p>{mensajeJuego}</p>
   </div>

   <div className="tablero-simon">
    {coloresArray.map((color, indice) => (
     <button
      key={color}
      className={obtenerClaseColor(color, indice)}
      onClick={() => manejarClickColor(color)}
      disabled={turnoSimon || !estaJugando}
     >
      <img src={coloresImagenes[color]} alt={color} />
     </button>
    ))}
   </div>

   <button onClick={iniciarJuego}>Iniciar Juego</button>
  </div>
 )
}

export default SimonDice