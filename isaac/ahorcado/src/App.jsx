import { useEffect, useState } from 'react'
import arrayPalabras from "./palabras.json";
import Monieco from './Monieco';
import "./App.css";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function App() {

  const MAX_FALLOS = 5

  const [palabraAleatoria, setPalabraAleatoria] = useState("")
  const [palabraOculta, setPalabraOculta] = useState(null)
  const [letrasIntroducidas, setLetrasIntroducidas] = useState([])
  const [fallos, setFallos] = useState(0)

  useEffect(() => {
    if(fallos == MAX_FALLOS){
      alert("Te has quedado sin vidas")
      iniciarJuego()
    }
  }, [fallos])

  function elegirPalabraAleatoria() {
    let indiceAleatorio = getRandomInt(0, arrayPalabras.length - 1)
    let palabraAleatoria = arrayPalabras[indiceAleatorio]

    setPalabraAleatoria(palabraAleatoria)
    setPalabraOculta(Array(palabraAleatoria.length).fill(" _ "))
  }

  function iniciarJuego() {
    elegirPalabraAleatoria()
    setFallos(0)
    setLetrasIntroducidas([])
  }

  function rellenarLetrasPalabraOculta(letraIntroducida) {
    const palabraOcultaCopy = palabraOculta.slice()

    for (let i = 0; i < palabraAleatoria.length; i++) {
      if (palabraAleatoria[i] == letraIntroducida) {
        palabraOcultaCopy[i] = letraIntroducida
      }
    }

    setPalabraOculta(palabraOcultaCopy)
  }

  function comprobarLetra(input) {
    let letraIntroducida = input.target.value.toLowerCase()

    let letraEstaUsada = letrasIntroducidas.includes(letraIntroducida)
    let heGanado = !palabraOculta.includes(" _ ")

    if (!letraEstaUsada && !heGanado) {
      let letraEstaEnPalabra = palabraAleatoria.includes(letraIntroducida)

      if (letraEstaEnPalabra) {
        rellenarLetrasPalabraOculta(letraIntroducida)
      } else {
        setFallos(fallos + 1)
      }

      // letrasIntroducidas.slice() es lo mismo que [...letrasIntroducidas]
      setLetrasIntroducidas([...letrasIntroducidas, letraIntroducida])

    }

  }

  return (
    <>
      {palabraAleatoria}<br></br>
      {palabraOculta}<br></br>
      {fallos}<br></br>
      {letrasIntroducidas}<br></br>
      <br></br><br></br>
      {/* Pongo value={''} para que la caja de texto esté siempre vacía */}
      <input onChange={comprobarLetra} value={''} type='text'></input>
      <br></br><br></br>
      <button onClick={iniciarJuego}>Iniciar juego</button>

      <Monieco fallos={fallos} />
    </>
  )
}

export default App
