import { useState, useEffect } from 'react'
import cartasData from './cards.json'
import reverso from './img/reverso.jpg'
import './App.css'
import Card from './Card'


function App() {
  const [cartas, setCartas] = useState([])
  const [seleccionadas, setSeleccionadas] = useState([])
  const [acertadas, setAcertadas] = useState([])

  useEffect(() => {
    mezclarCartas()
  }, [])

  function mezclarCartas() {
    const copia = [...cartasData]
    const mezcladas = []
    while (copia.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * copia.length)
      mezcladas.push(copia[indiceAleatorio])
      copia.splice(indiceAleatorio, 1)
    }
    setCartas(mezcladas)
  }

//   function mezclarCartas() {  // Algoritmo de Fisher-Yates
//   const mezcladas = [...cartasData];

//   for (let i = mezcladas.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1))

//     [mezcladas[i], mezcladas[j]] = [mezcladas[j], mezcladas[i]]
//   }

//   setCartas(mezcladas)
// }

  function seleccionarCarta(posicion) {
  let seleccionValida = true

  if (seleccionadas.length == 2 || acertadas.includes(posicion)) {
    seleccionValida = false
  }
  
  if (seleccionValida) {
    const nuevasSeleccionadas = [...seleccionadas, posicion]
    setSeleccionadas(nuevasSeleccionadas)

    if (nuevasSeleccionadas.length == 2) {
      comprobarPareja(nuevasSeleccionadas)
    }
  }
}

  

  function comprobarPareja(indices) {
    const primera = cartas[indices[0]]
    const segunda = cartas[indices[1]]

    if (primera.id == segunda.id) {
      const nuevasAcertadas = [...acertadas, indices[0], indices[1]]
      setAcertadas(nuevasAcertadas)
      setSeleccionadas([])
      if (nuevasAcertadas.length == cartas.length) {
        setTimeout(() => {
          alert('¡Has encontrado todas las parejas!')
          reiniciarJuego()
        }, 400)
      }
    } else {
      setTimeout(() => {
        setSeleccionadas([])
      }, 800)
    }
  }

  function reiniciarJuego() {
    mezclarCartas()
    setSeleccionadas([])
    setAcertadas([])
  }

  // function mostrarCarta(posicion) {
  //   const carta = cartas[posicion]
  //   const imagenReal = new URL(`./img/${carta.imagen}`, import.meta.url).href
  //   const mostrar = acertadas.includes(posicion) || seleccionadas.includes(posicion)
  //   let contenido

  //   if (mostrar) {
  //     contenido = <img src={imagenReal} alt={carta.nombre} className="carta" />
  //   } else {
  //     contenido = <img src={reverso} alt="reverso" className="carta" />
  //   }

  //   return contenido
  // }

//   return (
//     <div className="contenedor-cartas">
//       {cartas.map((_, indiceCarta) => (
//         <div key={indiceCarta} onClick={() => seleccionarCarta(indiceCarta)}>
//           {mostrarCarta(indiceCarta)}
//         </div>
//       ))}
//     </div>
//   )
// }

 return (
    <div className="contenedor-cartas">
      {cartas.map((carta, indice) => {
        const volteada = acertadas.includes(indice) || seleccionadas.includes(indice)
        return (
          <Card
            key={indice}
            carta={carta}
            volteada={volteada}
            onClick={() => seleccionarCarta(indice)}
          />
        )
      })}
    </div>
  )
}

export default App



// importando todas las imagenes:
// import { useState, useEffect } from 'react'
// import cartasData from './cards.json'
// import reverso from './img/reverso.jpg'
// import mono from './img/mono.jpg'
// import rana from './img/rana.jpg'
// import gorila from './img/gorila.jpg'
// import cobra from './img/cobra.jpg'
// import orangutan from './img/orangutan.jpg'
// import cocodrilo from './img/cocodrilo.jpg'
// import './App.css'

// function App() {
//   const [cartas, setCartas] = useState([])
//   const [seleccionadas, setSeleccionadas] = useState([])
//   const [acertadas, setAcertadas] = useState([])

//   const imagenes = {
//     mono: mono,
//     rana: rana,
//     gorila: gorila,
//     cobra: cobra,
//     orangutan: orangutan,
//     cocodrilo: cocodrilo
//   }

//   useEffect(() => {
//     mezclarCartas()
//   }, [])

//   function mezclarCartas() {
//     const mezcladas = [...cartasData]
//     for (let i = mezcladas.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1))
//       const temp = mezcladas[i]
//       mezcladas[i] = mezcladas[j]
//       mezcladas[j] = temp
//     }
//     setCartas(mezcladas)
//   }

//   function seleccionarCarta(posicion) {
//     let seleccionValida = true
//     if (seleccionadas.length == 2 || acertadas.includes(posicion)) {
//       seleccionValida = false
//     }
//     if (seleccionValida) {
//       const nuevasSeleccionadas = [...seleccionadas, posicion]
//       setSeleccionadas(nuevasSeleccionadas)
//       if (nuevasSeleccionadas.length == 2) {
//         comprobarPareja(nuevasSeleccionadas)
//       }
//     }
//   }

//   function comprobarPareja(indices) {
//     const primera = cartas[indices[0]]
//     const segunda = cartas[indices[1]]
//     if (primera.id == segunda.id) {
//       const nuevasAcertadas = [...acertadas, indices[0], indices[1]]
//       setAcertadas(nuevasAcertadas)
//       setSeleccionadas([])
//       if (nuevasAcertadas.length == cartas.length) {
//         setTimeout(() => {
//           alert('¡Has encontrado todas las parejas!')
//           reiniciarJuego()
//         }, 400)
//       }
//     } else {
//       setTimeout(() => {
//         setSeleccionadas([])
//       }, 800)
//     }
//   }

//   function reiniciarJuego() {
//     mezclarCartas()
//     setSeleccionadas([])
//     setAcertadas([])
//   }

//   function mostrarCarta(posicion) {
//     const carta = cartas[posicion]
//     const mostrar = acertadas.includes(posicion) || seleccionadas.includes(posicion)
//     let contenido
//     if (mostrar) {
//       contenido = <img src={imagenes[carta.nombre]} alt={carta.nombre} className="carta" />
//     } else {
//       contenido = <img src={reverso} alt="reverso" className="carta" />
//     }
//     return contenido
//   }

//   return (
//     <div className="contenedor-cartas">
//       {cartas.map((_, indiceCarta) => (
//         <div key={indiceCarta} onClick={() => seleccionarCarta(indiceCarta)}>
//           {mostrarCarta(indiceCarta)}
//         </div>
//       ))}
//     </div>
//   )
// }

// export default App

