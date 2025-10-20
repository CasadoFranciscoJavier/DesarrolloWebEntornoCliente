import React, { useState, useEffect } from 'react'
import iconos from './iconos.json'

// Importaciones de imágenes
import imagenCereza from './assets/cerezas.png' 
import imagenLimon from './assets/limon.png'
import imagenUva from './assets/uva.png'
import imagenSiete from './assets/siete.jpg'
import imagenCampana from './assets/campana.png'
import imagenBar from './assets/bar.jpg'

function getRandomInt(min, max) {
   min = Math.ceil(min)
   max = Math.floor(max)
   return Math.floor(Math.random() * (max - min + 1) + min)
}

// Coste fijo por jugada, basado en tu lógica implícita
const COSTE_JUGADA = 5

export default function Tragaperras() {

   const [icono1, setIcono1] = useState(0)
   const [icono2, setIcono2] = useState(0)
   const [icono3, setIcono3] = useState(0)
   const [saldo, setSaldo] = useState(20)
   const [mensaje, setMensaje] = useState('')
   const [giroCompletado, setGiroCompletado] = useState(false)

   const imagenesIconos = [
      imagenCereza,
      imagenLimon,
      imagenUva,
      imagenSiete,
      imagenCampana,
      imagenBar,
   ]

   useEffect(() => {
      // La verificación se dispara SOLO después de que los iconos han cambiado
      if (giroCompletado) {
         verificarResultado(icono1, icono2, icono3)
         setGiroCompletado(false)
      }
   }, [icono1, icono2, icono3, giroCompletado])


   function girar() {

      // 1. CORRECCIÓN: Comprobación de saldo
      if (saldo < COSTE_JUGADA) {
         alert("¡Saldo insuficiente! Necesitas " + COSTE_JUGADA + "€");

      } else {
         setSaldo(saldo - COSTE_JUGADA)

         let maxIndice = imagenesIconos.length - 1
         let indiceAleatorio1 = getRandomInt(0, maxIndice)
         let indiceAleatorio2 = getRandomInt(0, maxIndice)
         let indiceAleatorio3 = getRandomInt(0, maxIndice)

         setIcono1(indiceAleatorio1)
         setIcono2(indiceAleatorio2)
         setIcono3(indiceAleatorio3)
         setGiroCompletado(true)
      }


   }


   function verificarResultado(rodillo1, rodillo2, rodillo3) {


      const todosIguales = rodillo1 == rodillo2 && rodillo2 == rodillo3
      const dosIguales = rodillo1 == rodillo2 || rodillo2 == rodillo3 || rodillo1 == rodillo3
      let premio = 0

      if (todosIguales) {
         // Ganancia: COSTE_JUGADA (5€) * multiplicador
         const multiplicador = iconos[rodillo1].multiplicador
         premio = COSTE_JUGADA * multiplicador
         setSaldo(saldo + premio)
         setMensaje(`¡JACKPOT! Ganaste ${premio}€ (x${multiplicador})`)

      } else if (dosIguales) {
         // Premio por dos iguales (usando un multiplicador x1.5 para el COSTE_JUGADA)
         const MULTIPLICADOR_DOS_IGUALES = 1.5
         premio = COSTE_JUGADA * MULTIPLICADOR_DOS_IGUALES
         setSaldo(saldo + premio)
         setMensaje(`¡Dos iguales! Ganaste ${premio}€`)
      } else {
         // No se resta nada aquí, ya se descontó al inicio de girar()
         setMensaje('Perdiste. Intenta de nuevo')
      }
   }


   return (
      <div>
         <h1>Tragaperras</h1>
         <div className="info-panel">
            <h2>💰 Saldo: {saldo}€</h2>
            <h3>Coste por jugada: {COSTE_JUGADA}€</h3>
         </div>
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
               src={imagenesIconos[icono1]}
               alt={iconos[icono1].nombre}
               style={{ width: '100px', height: '100px', margin: '10px' }}
            />
            <img
               src={imagenesIconos[icono2]}
               alt={iconos[icono2].nombre}
               style={{ width: '100px', height: '100px', margin: '10px' }}
            />
            <img
               src={imagenesIconos[icono3]}
               alt={iconos[icono3].nombre}
               style={{ width: '100px', height: '100px', margin: '10px' }}
            />
         </div>
         <div>
            <h3>{mensaje}</h3>
            <button onClick={girar} >Girar</button>
            <button onClick={() => { setSaldo(20); setMensaje(''); } } disabled={saldo >= 5} >Reiniciar Saldo</button>
         </div>
      </div>
   )
}