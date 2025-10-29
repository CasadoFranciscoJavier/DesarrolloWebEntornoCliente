import { useState } from 'react'
import './App.css'

export default function ConversorUnidades() {
  const [categoria, setCategoria] = useState('longitud')
  const [valorEntrada, setValorEntrada] = useState('')
  const [unidadOrigen, setUnidadOrigen] = useState('metros')
  const [unidadDestino, setUnidadDestino] = useState('kilometros')
  const [resultado, setResultado] = useState(null)
  const [historial, setHistorial] = useState([])
  const [error, setError] = useState('')

  const unidades = {
    longitud: {
      metros: { nombre: 'Metros', factor: 1 },
      kilometros: { nombre: 'Kilómetros', factor: 0.001 },
      millas: { nombre: 'Millas', factor: 0.000621371 },
      pies: { nombre: 'Pies', factor: 3.28084 },
      pulgadas: { nombre: 'Pulgadas', factor: 39.3701 }
    },
    peso: {
      gramos: { nombre: 'Gramos', factor: 1 },
      kilogramos: { nombre: 'Kilogramos', factor: 0.001 },
      libras: { nombre: 'Libras', factor: 0.00220462 },
      onzas: { nombre: 'Onzas', factor: 0.035274 }
    },
    temperatura: {
      celsius: { nombre: 'Celsius' },
      fahrenheit: { nombre: 'Fahrenheit' },
      kelvin: { nombre: 'Kelvin' }
    },
    volumen: {
      litros: { nombre: 'Litros', factor: 1 },
      mililitros: { nombre: 'Mililitros', factor: 1000 },
      galones: { nombre: 'Galones', factor: 0.264172 },
      pintas: { nombre: 'Pintas', factor: 2.11338 }
    },
    tiempo: {
      segundos: { nombre: 'Segundos', factor: 1 },
      minutos: { nombre: 'Minutos', factor: 1/60 },
      horas: { nombre: 'Horas', factor: 1/3600 },
      dias: { nombre: 'Días', factor: 1/86400 }
    }
  }

  function convertirTemperatura(valor, desde, hacia) {
    let celsius = 0

    if (desde === 'celsius') {
      celsius = valor
    } else if (desde === 'fahrenheit') {
      celsius = (valor - 32) * 5/9
    } else if (desde === 'kelvin') {
      celsius = valor - 273.15
    }

    if (hacia === 'celsius') {
      return celsius
    } else if (hacia === 'fahrenheit') {
      return celsius * 9/5 + 32
    } else if (hacia === 'kelvin') {
      return celsius + 273.15
    }

    return celsius
  }

  function convertir(valor, desde, hacia, cat) {
    if (cat === 'temperatura') {
      return convertirTemperatura(valor, desde, hacia)
    }

    const factorOrigen = unidades[cat][desde].factor
    const factorDestino = unidades[cat][hacia].factor
    const valorBase = valor / factorOrigen
    return valorBase * factorDestino
  }

  function validarEntrada(valor) {
    if (valor === '') {
      return { valido: true, error: '' }
    }

    const numero = parseFloat(valor)

    if (isNaN(numero)) {
      return { valido: false, error: 'Entrada inválida' }
    }

    if (categoria !== 'temperatura' && numero < 0) {
      return { valido: false, error: 'Solo números positivos' }
    }

    return { valido: true, error: '' }
  }

  function manejarCambioEntrada(e) {
    const valor = e.target.value
    setValorEntrada(valor)

    const validacion = validarEntrada(valor)
    setError(validacion.error)

    if (validacion.valido && valor !== '') {
      if (unidadOrigen === unidadDestino) {
        setResultado(parseFloat(valor))
      } else {
        const res = convertir(parseFloat(valor), unidadOrigen, unidadDestino, categoria)
        setResultado(parseFloat(res.toFixed(4)))
      }
    } else {
      setResultado(null)
    }
  }

  function manejarCambioCategoria(nuevaCategoria) {
    setCategoria(nuevaCategoria)
    const primeraUnidad = Object.keys(unidades[nuevaCategoria])[0]
    const segundaUnidad = Object.keys(unidades[nuevaCategoria])[1]
    setUnidadOrigen(primeraUnidad)
    setUnidadDestino(segundaUnidad)
    setValorEntrada('')
    setResultado(null)
    setError('')
  }

  function manejarCambioUnidadOrigen(e) {
    const nuevaUnidad = e.target.value
    setUnidadOrigen(nuevaUnidad)

    if (valorEntrada !== '' && error === '') {
      if (nuevaUnidad === unidadDestino) {
        setResultado(parseFloat(valorEntrada))
      } else {
        const res = convertir(parseFloat(valorEntrada), nuevaUnidad, unidadDestino, categoria)
        setResultado(parseFloat(res.toFixed(4)))
      }
    }
  }

  function manejarCambioUnidadDestino(e) {
    const nuevaUnidad = e.target.value
    setUnidadDestino(nuevaUnidad)

    if (valorEntrada !== '' && error === '') {
      if (unidadOrigen === nuevaUnidad) {
        setResultado(parseFloat(valorEntrada))
      } else {
        const res = convertir(parseFloat(valorEntrada), unidadOrigen, nuevaUnidad, categoria)
        setResultado(parseFloat(res.toFixed(4)))
      }
    }
  }

  function intercambiarUnidades() {
    const temp = unidadOrigen
    setUnidadOrigen(unidadDestino)
    setUnidadDestino(temp)

    if (valorEntrada !== '' && error === '') {
      const res = convertir(parseFloat(valorEntrada), unidadDestino, temp, categoria)
      setResultado(parseFloat(res.toFixed(4)))
    }
  }

  function agregarAlHistorial() {
    if (valorEntrada !== '' && resultado !== null && error === '') {
      const nuevaConversion = {
        id: Date.now(),
        categoria: categoria,
        valor: parseFloat(valorEntrada),
        unidadOrigen: unidades[categoria][unidadOrigen].nombre,
        resultado: resultado,
        unidadDestino: unidades[categoria][unidadDestino].nombre,
        fecha: new Date().toLocaleTimeString()
      }

      const nuevoHistorial = [nuevaConversion, ...historial].slice(0, 10)
      setHistorial(nuevoHistorial)
    }
  }

  function limpiarHistorial() {
    setHistorial([])
  }

  function reutilizarConversion(item) {
    setCategoria(item.categoria)
    const unidadesCat = unidades[item.categoria]
    const unidadOrigenKey = Object.keys(unidadesCat).find(
      key => unidadesCat[key].nombre === item.unidadOrigen
    )
    const unidadDestinoKey = Object.keys(unidadesCat).find(
      key => unidadesCat[key].nombre === item.unidadDestino
    )
    setUnidadOrigen(unidadOrigenKey)
    setUnidadDestino(unidadDestinoKey)
    setValorEntrada(item.valor.toString())
    setResultado(item.resultado)
    setError('')
  }

  function obtenerFormula() {
    if (categoria === 'temperatura') {
      if (unidadOrigen === 'celsius' && unidadDestino === 'fahrenheit') {
        return '°F = (°C × 9/5) + 32'
      }
      if (unidadOrigen === 'fahrenheit' && unidadDestino === 'celsius') {
        return '°C = (°F - 32) × 5/9'
      }
      if (unidadOrigen === 'celsius' && unidadDestino === 'kelvin') {
        return 'K = °C + 273.15'
      }
      if (unidadOrigen === 'kelvin' && unidadDestino === 'celsius') {
        return '°C = K - 273.15'
      }
      if (unidadOrigen === 'fahrenheit' && unidadDestino === 'kelvin') {
        return 'K = (°F - 32) × 5/9 + 273.15'
      }
      if (unidadOrigen === 'kelvin' && unidadDestino === 'fahrenheit') {
        return '°F = (K - 273.15) × 9/5 + 32'
      }
      return 'Igual'
    }

    if (unidadOrigen === unidadDestino) {
      return 'Valor sin cambios'
    }

    const factorOrigen = unidades[categoria][unidadOrigen].factor
    const factorDestino = unidades[categoria][unidadDestino].factor
    const factor = factorDestino / factorOrigen
    return `Multiplicar por ${factor.toFixed(6)}`
  }

  return (
    <div className="conversor-container">
      <h1>Conversor de Unidades</h1>

      <div className="categorias-tabs">
        {Object.keys(unidades).map(cat => (
          <button
            key={cat}
            onClick={() => manejarCambioCategoria(cat)}
            className={categoria === cat ? 'tab activo' : 'tab'}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="conversor-main">
        <div className="conversion-container">
          <div className="input-grupo">
            <label>Valor</label>
            <input
              type="number"
              value={valorEntrada}
              onChange={manejarCambioEntrada}
              placeholder="Introduce un valor"
              className={error ? 'input-error' : ''}
            />
            {error && <span className="mensaje-error">{error}</span>}
          </div>

          <div className="unidades-grupo">
            <div className="unidad-selector">
              <label>De:</label>
              <select value={unidadOrigen} onChange={manejarCambioUnidadOrigen}>
                {Object.entries(unidades[categoria]).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.nombre}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={intercambiarUnidades} className="btn-intercambiar">
              ⇄
            </button>

            <div className="unidad-selector">
              <label>A:</label>
              <select value={unidadDestino} onChange={manejarCambioUnidadDestino}>
                {Object.entries(unidades[categoria]).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {resultado !== null && (
            <div className="resultado-container">
              <div className="resultado-valor">
                {resultado}
              </div>
              <div className="resultado-unidad">
                {unidades[categoria][unidadDestino].nombre}
              </div>
            </div>
          )}

          {unidadOrigen === unidadDestino && valorEntrada !== '' && (
            <div className="advertencia">
              Las unidades origen y destino son iguales
            </div>
          )}

          <div className="formula-container">
            <strong>Fórmula:</strong> {obtenerFormula()}
          </div>

          {valorEntrada !== '' && resultado !== null && error === '' && (
            <button onClick={agregarAlHistorial} className="btn-guardar">
              Guardar en Historial
            </button>
          )}
        </div>

        <div className="historial-container">
          <div className="historial-header">
            <h3>Historial</h3>
            {historial.length > 0 && (
              <button onClick={limpiarHistorial} className="btn-limpiar-hist">
                Limpiar
              </button>
            )}
          </div>

          <div className="historial-lista">
            {historial.length === 0 ? (
              <p className="historial-vacio">No hay conversiones guardadas</p>
            ) : (
              historial.map(item => (
                <div key={item.id} className="historial-item">
                  <div className="historial-info">
                    <span className="historial-categoria">{item.categoria}</span>
                    <span className="historial-hora">{item.fecha}</span>
                  </div>
                  <div className="historial-conversion">
                    {item.valor} {item.unidadOrigen} = {item.resultado} {item.unidadDestino}
                  </div>
                  <button
                    onClick={() => reutilizarConversion(item)}
                    className="btn-reutilizar"
                  >
                    Reutilizar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
