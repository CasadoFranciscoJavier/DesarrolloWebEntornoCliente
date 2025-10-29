import { useState } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function GeneradorContrasenas() {
  const [longitud, setLongitud] = useState(12)
  const [incluirMayusculas, setIncluirMayusculas] = useState(true)
  const [incluirMinusculas, setIncluirMinusculas] = useState(true)
  const [incluirNumeros, setIncluirNumeros] = useState(true)
  const [incluirSimbolos, setIncluirSimbolos] = useState(true)
  const [contrasena, setContrasena] = useState('')
  const [historial, setHistorial] = useState([])
  const [fortaleza, setFortaleza] = useState('')

  const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const minusculas = 'abcdefghijklmnopqrstuvwxyz'
  const numeros = '0123456789'
  const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  function generarContrasena() {
    let caracteres = ''
    let nuevaContrasena = ''

    if (incluirMayusculas) caracteres += mayusculas
    if (incluirMinusculas) caracteres += minusculas
    if (incluirNumeros) caracteres += numeros
    if (incluirSimbolos) caracteres += simbolos

    if (caracteres === '') {
      setContrasena('Selecciona al menos una opción')
      return
    }

    for (let i = 0; i < longitud; i++) {
      nuevaContrasena += caracteres[getRandomInt(0, caracteres.length - 1)]
    }

    setContrasena(nuevaContrasena)
    calcularFortaleza(nuevaContrasena)
    agregarAHistorial(nuevaContrasena)
  }

  function calcularFortaleza(pass) {
    let puntos = 0

    if (pass.length >= 8) puntos++
    if (pass.length >= 12) puntos++
    if (pass.length >= 16) puntos++

    if (pass.match(/[a-z]/)) puntos++
    if (pass.match(/[A-Z]/)) puntos++
    if (pass.match(/[0-9]/)) puntos++
    if (pass.match(/[^a-zA-Z0-9]/)) puntos++

    if (puntos <= 2) {
      setFortaleza('Débil')
    } else if (puntos <= 4) {
      setFortaleza('Media')
    } else if (puntos <= 6) {
      setFortaleza('Fuerte')
    } else {
      setFortaleza('Muy Fuerte')
    }
  }

  function agregarAHistorial(pass) {
    const nuevoHistorial = [
      { password: pass, fecha: new Date().toLocaleString() },
      ...historial
    ].slice(0, 10)
    setHistorial(nuevoHistorial)
  }

  function copiarAlPortapapeles() {
    if (contrasena && contrasena !== 'Selecciona al menos una opción') {
      navigator.clipboard.writeText(contrasena)
      alert('Contraseña copiada al portapapeles')
    }
  }

  function cambiarLongitud(e) {
    const valor = parseInt(e.target.value)
    if (valor >= 4 && valor <= 50) {
      setLongitud(valor)
    }
  }

  function limpiarHistorial() {
    setHistorial([])
  }

  return (
    <div className="generador-container">
      <h1>Generador de Contraseñas</h1>

      <div className="resultado-container">
        <div className="contrasena-display">
          {contrasena || 'Genera una contraseña'}
        </div>
        {contrasena && contrasena !== 'Selecciona al menos una opción' && (
          <>
            <div className={`fortaleza fortaleza-${fortaleza.toLowerCase().replace(' ', '-')}`}>
              Fortaleza: {fortaleza}
            </div>
            <button onClick={copiarAlPortapapeles} className="btn-copiar">
              📋 Copiar
            </button>
          </>
        )}
      </div>

      <div className="opciones-container">
        <div className="opcion-longitud">
          <label>
            Longitud: {longitud}
            <input
              type="range"
              min="4"
              max="50"
              value={longitud}
              onChange={cambiarLongitud}
            />
          </label>
        </div>

        <div className="opciones-caracteres">
          <label>
            <input
              type="checkbox"
              checked={incluirMayusculas}
              onChange={(e) => setIncluirMayusculas(e.target.checked)}
            />
            Mayúsculas (A-Z)
          </label>

          <label>
            <input
              type="checkbox"
              checked={incluirMinusculas}
              onChange={(e) => setIncluirMinusculas(e.target.checked)}
            />
            Minúsculas (a-z)
          </label>

          <label>
            <input
              type="checkbox"
              checked={incluirNumeros}
              onChange={(e) => setIncluirNumeros(e.target.checked)}
            />
            Números (0-9)
          </label>

          <label>
            <input
              type="checkbox"
              checked={incluirSimbolos}
              onChange={(e) => setIncluirSimbolos(e.target.checked)}
            />
            Símbolos (!@#$%...)
          </label>
        </div>

        <button onClick={generarContrasena} className="btn-generar">
          Generar Contraseña
        </button>
      </div>

      <div className="historial-container">
        <div className="historial-header">
          <h3>Historial (últimas 10)</h3>
          {historial.length > 0 && (
            <button onClick={limpiarHistorial} className="btn-limpiar">
              Limpiar
            </button>
          )}
        </div>
        <div className="historial-lista">
          {historial.map((item, index) => (
            <div key={index} className="historial-item">
              <span className="historial-password">{item.password}</span>
              <span className="historial-fecha">{item.fecha}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(item.password)
                  alert('Contraseña copiada')
                }}
                className="btn-copiar-mini"
              >
                📋
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
