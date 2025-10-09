import { useState, useEffect } from 'react'
import Jugador from './Jugador';

const TAMANIO_TAMBOR = 6

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function RuletaRusa() {

    const [pistola, setPistola] = useState(Array(TAMANIO_TAMBOR).fill(0))
    const [jugadores, setJugadores] = useState([])

    function cargarPistola() {
        const nuevaPistola = Array(TAMANIO_TAMBOR).fill(0)
        let posicionBala = getRandomInt(0, TAMANIO_TAMBOR - 1)

        nuevaPistola[posicionBala] = 1
        setPistola(nuevaPistola)
    }

    function elegirCantidadJugadores(cantidadJugadores) {
        const nuevosJugadores = Array(Number(cantidadJugadores)).fill(1)
        setJugadores(nuevosJugadores)
    }

    function pegarseUnTiro(numeroJugador){
        let hayBala = pistola[0]

        if(hayBala){
            const copiaJugadores = jugadores.slice() // Copio el array
            copiaJugadores[numeroJugador] = 0
            setJugadores(copiaJugadores)
        }

        cargarPistola();
    }

    useEffect(() => {
        cargarPistola();
    }, []);

    return (
        <>
            <h1>RULETA RUSA</h1>
            <label>Numero de jugadores: <input type="number" onChange={(input) => elegirCantidadJugadores(input.target.value)} /></label>

            {jugadores.map((value, index) => (
                <Jugador jugador={index} estadoJugador={value} disparar={() => pegarseUnTiro(index)}></Jugador>
            ))}

        </>
    )
}
