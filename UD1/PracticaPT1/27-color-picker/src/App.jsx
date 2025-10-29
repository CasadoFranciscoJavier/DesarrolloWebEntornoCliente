import { useState } from 'react'
import './App.css'

function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = n.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return '#' + toHex(r) + toHex(g) + toHex(b)
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
  }
  return { r: 0, g: 0, b: 0 }
}

export default function ColorPicker() {
  const [r, setR] = useState(100)
  const [g, setG] = useState(150)
  const [b, setB] = useState(200)
  const [historial, setHistorial] = useState([])
  const [nombreColor, setNombreColor] = useState('')

  const hexColor = rgbToHex(r, g, b)

  function cambiarR(e) {
    const valor = parseInt(e.target.value)
    if (valor >= 0 && valor <= 255) {
      setR(valor)
    }
  }

  function cambiarG(e) {
    const valor = parseInt(e.target.value)
    if (valor >= 0 && valor <= 255) {
      setG(valor)
    }
  }

  function cambiarB(e) {
    const valor = parseInt(e.target.value)
    if (valor >= 0 && valor <= 255) {
      setB(valor)
    }
  }

  function cambiarHex(e) {
    const hex = e.target.value
    if (hex.length === 7) {
      const rgb = hexToRgb(hex)
      setR(rgb.r)
      setG(rgb.g)
      setB(rgb.b)
    }
  }

  function colorAleatorio() {
    setR(Math.floor(Math.random() * 256))
    setG(Math.floor(Math.random() * 256))
    setB(Math.floor(Math.random() * 256))
  }

  function guardarColor() {
    const nombre = nombreColor.trim() !== '' ? nombreColor : `Color ${historial.length + 1}`
    const nuevoColor = {
      nombre: nombre,
      r: r,
      g: g,
      b: b,
      hex: hexColor
    }
    setHistorial([...historial, nuevoColor])
    setNombreColor('')
  }

  function cargarColor(color) {
    setR(color.r)
    setG(color.g)
    setB(color.b)
  }

  function eliminarColor(index) {
    setHistorial(historial.filter((_, i) => i !== index))
  }

  function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto)
  }

  function invertirColor() {
    setR(255 - r)
    setG(255 - g)
    setB(255 - b)
  }

  function escalaGrises() {
    const promedio = Math.floor((r + g + b) / 3)
    setR(promedio)
    setG(promedio)
    setB(promedio)
  }

  const luminosidad = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  const textoColor = luminosidad > 0.5 ? '#000000' : '#FFFFFF'

  return (
    <div className="color-picker-container">
      <h1>🎨 Color Picker 🎨</h1>

      <div className="preview" style={{ backgroundColor: hexColor, color: textoColor }}>
        <h2>Vista Previa</h2>
        <p>RGB: ({r}, {g}, {b})</p>
        <p>HEX: {hexColor}</p>
      </div>

      <div className="controles-rgb">
        <div className="control">
          <label>
            Rojo (R):
            <input
              type="range"
              min="0"
              max="255"
              value={r}
              onChange={cambiarR}
              className="slider rojo"
            />
            <input
              type="number"
              value={r}
              onChange={cambiarR}
              min="0"
              max="255"
            />
          </label>
        </div>

        <div className="control">
          <label>
            Verde (G):
            <input
              type="range"
              min="0"
              max="255"
              value={g}
              onChange={cambiarG}
              className="slider verde"
            />
            <input
              type="number"
              value={g}
              onChange={cambiarG}
              min="0"
              max="255"
            />
          </label>
        </div>

        <div className="control">
          <label>
            Azul (B):
            <input
              type="range"
              min="0"
              max="255"
              value={b}
              onChange={cambiarB}
              className="slider azul"
            />
            <input
              type="number"
              value={b}
              onChange={cambiarB}
              min="0"
              max="255"
            />
          </label>
        </div>
      </div>

      <div className="control-hex">
        <label>
          Código HEX:
          <input
            type="text"
            value={hexColor}
            onChange={cambiarHex}
            maxLength="7"
          />
        </label>
        <button onClick={() => copiarAlPortapapeles(hexColor)} className="btn-copiar">
          Copiar HEX
        </button>
        <button onClick={() => copiarAlPortapapeles(`rgb(${r}, ${g}, ${b})`)} className="btn-copiar">
          Copiar RGB
        </button>
      </div>

      <div className="acciones">
        <button onClick={colorAleatorio} className="btn-aleatorio">
          Color Aleatorio
        </button>
        <button onClick={invertirColor} className="btn-invertir">
          Invertir Color
        </button>
        <button onClick={escalaGrises} className="btn-grises">
          Escala de Grises
        </button>
      </div>

      <div className="guardar-color">
        <input
          type="text"
          value={nombreColor}
          onChange={(e) => setNombreColor(e.target.value)}
          placeholder="Nombre del color (opcional)"
        />
        <button onClick={guardarColor} className="btn-guardar">
          Guardar Color
        </button>
      </div>

      {historial.length > 0 && (
        <div className="historial">
          <h3>Colores Guardados:</h3>
          <div className="lista-colores">
            {historial.map((color, index) => (
              <div
                key={index}
                className="color-guardado"
                style={{ backgroundColor: color.hex }}
              >
                <p className="nombre-color">{color.nombre}</p>
                <p className="hex-color">{color.hex}</p>
                <div className="botones-color">
                  <button onClick={() => cargarColor(color)} className="btn-cargar">
                    Cargar
                  </button>
                  <button onClick={() => eliminarColor(index)} className="btn-eliminar">
                    ✗
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
