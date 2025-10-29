import { useState } from 'react'
import './App.css'

export default function CalculadoraPropinas() {
  const [montoCuenta, setMontoCuenta] = useState('')
  const [porcentajePropina, setPorcentajePropina] = useState(15)
  const [numPersonas, setNumPersonas] = useState(1)
  const [modoServicio, setModoServicio] = useState('')

  const porcentajesPredefinidos = [10, 15, 18, 20, 25]

  const modoServicios = {
    malo: { nombre: 'Malo', porcentaje: 10, emoji: '😞' },
    regular: { nombre: 'Regular', porcentaje: 15, emoji: '😐' },
    bueno: { nombre: 'Bueno', porcentaje: 18, emoji: '🙂' },
    excelente: { nombre: 'Excelente', porcentaje: 25, emoji: '😄' }
  }

  function calcularPropina() {
    const monto = parseFloat(montoCuenta)
    if (isNaN(monto) || monto <= 0) {
      return 0
    }
    return (monto * porcentajePropina) / 100
  }

  function calcularTotal() {
    const monto = parseFloat(montoCuenta)
    if (isNaN(monto) || monto <= 0) {
      return 0
    }
    return monto + calcularPropina()
  }

  function calcularPorPersona() {
    const total = calcularTotal()
    if (total === 0 || numPersonas <= 0) {
      return 0
    }
    return total / numPersonas
  }

  function calcularPropinaPorPersona() {
    const propina = calcularPropina()
    if (propina === 0 || numPersonas <= 0) {
      return 0
    }
    return propina / numPersonas
  }

  function calcularBasePorPersona() {
    const monto = parseFloat(montoCuenta)
    if (isNaN(monto) || monto <= 0 || numPersonas <= 0) {
      return 0
    }
    return monto / numPersonas
  }

  function manejarCambioMonto(e) {
    const valor = e.target.value
    if (valor === '' || parseFloat(valor) >= 0) {
      setMontoCuenta(valor)
    }
  }

  function manejarCambioPorcentaje(e) {
    const valor = parseInt(e.target.value)
    if (!isNaN(valor) && valor >= 0 && valor <= 100) {
      setPorcentajePropina(valor)
      setModoServicio('')
    }
  }

  function seleccionarPorcentaje(porcentaje) {
    setPorcentajePropina(porcentaje)
    setModoServicio('')
  }

  function seleccionarModoServicio(modo) {
    setModoServicio(modo)
    setPorcentajePropina(modoServicios[modo].porcentaje)
  }

  function incrementarPersonas() {
    if (numPersonas < 50) {
      setNumPersonas(numPersonas + 1)
    }
  }

  function decrementarPersonas() {
    if (numPersonas > 1) {
      setNumPersonas(numPersonas - 1)
    }
  }

  function resetear() {
    setMontoCuenta('')
    setPorcentajePropina(15)
    setNumPersonas(1)
    setModoServicio('')
  }

  function formatearMoneda(valor) {
    return valor.toFixed(2)
  }

  const propina = calcularPropina()
  const total = calcularTotal()
  const porPersona = calcularPorPersona()
  const propinaPorPersona = calcularPropinaPorPersona()
  const basePorPersona = calcularBasePorPersona()
  const montoValido = montoCuenta !== '' && parseFloat(montoCuenta) > 0

  return (
    <div className="calculadora-propinas-container">
      <h1>Calculadora de Propinas</h1>

      <div className="calculadora-main">
        <div className="seccion-entrada">
          <h2>Datos de la Cuenta</h2>

          <div className="input-grupo">
            <label>Monto Total ($)</label>
            <input
              type="number"
              value={montoCuenta}
              onChange={manejarCambioMonto}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="input-monto"
            />
          </div>

          <div className="modo-servicio-container">
            <label>Calidad del Servicio</label>
            <div className="modo-servicio-grid">
              {Object.entries(modoServicios).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => seleccionarModoServicio(key)}
                  className={`btn-modo-servicio ${modoServicio === key ? 'activo' : ''}`}
                >
                  <span className="emoji">{value.emoji}</span>
                  <span className="nombre">{value.nombre}</span>
                  <span className="porcentaje">{value.porcentaje}%</span>
                </button>
              ))}
            </div>
          </div>

          <div className="porcentaje-container">
            <label>Porcentaje de Propina: {porcentajePropina}%</label>
            <div className="porcentajes-predefinidos">
              {porcentajesPredefinidos.map(porcentaje => (
                <button
                  key={porcentaje}
                  onClick={() => seleccionarPorcentaje(porcentaje)}
                  className={`btn-porcentaje ${porcentajePropina === porcentaje && modoServicio === '' ? 'activo' : ''}`}
                >
                  {porcentaje}%
                </button>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={porcentajePropina}
              onChange={manejarCambioPorcentaje}
              className="slider-porcentaje"
            />
            <div className="input-personalizado">
              <label>Personalizado:</label>
              <input
                type="number"
                value={porcentajePropina}
                onChange={manejarCambioPorcentaje}
                min="0"
                max="100"
                className="input-porcentaje-custom"
              />
              <span>%</span>
            </div>
          </div>

          <div className="personas-container">
            <label>Número de Personas</label>
            <div className="personas-control">
              <button
                onClick={decrementarPersonas}
                disabled={numPersonas <= 1}
                className="btn-personas"
              >
                -
              </button>
              <span className="num-personas">{numPersonas}</span>
              <button
                onClick={incrementarPersonas}
                disabled={numPersonas >= 50}
                className="btn-personas"
              >
                +
              </button>
            </div>
          </div>

          <button onClick={resetear} className="btn-resetear">
            Resetear Todo
          </button>
        </div>

        <div className="seccion-resultados">
          <h2>Resultados</h2>

          {montoValido ? (
            <>
              <div className="resultado-card">
                <div className="resultado-label">Monto Original</div>
                <div className="resultado-valor">${formatearMoneda(parseFloat(montoCuenta))}</div>
              </div>

              <div className="resultado-card propina">
                <div className="resultado-label">Propina ({porcentajePropina}%)</div>
                <div className="resultado-valor">${formatearMoneda(propina)}</div>
              </div>

              <div className="resultado-card total">
                <div className="resultado-label">Total con Propina</div>
                <div className="resultado-valor grande">${formatearMoneda(total)}</div>
              </div>

              {numPersonas > 1 && (
                <>
                  <div className="divisor"></div>
                  <h3>División entre {numPersonas} personas</h3>

                  <div className="resultado-card por-persona">
                    <div className="resultado-label">Total por Persona</div>
                    <div className="resultado-valor grande">${formatearMoneda(porPersona)}</div>
                  </div>

                  <div className="desglose-persona">
                    <div className="desglose-item">
                      <span>Base:</span>
                      <span>${formatearMoneda(basePorPersona)}</span>
                    </div>
                    <div className="desglose-item">
                      <span>Propina:</span>
                      <span>${formatearMoneda(propinaPorPersona)}</span>
                    </div>
                  </div>
                </>
              )}

              <div className="resumen-visual">
                <div className="barra-visual">
                  <div
                    className="barra-base"
                    style={{ width: '100%' }}
                  >
                    Base
                  </div>
                  <div
                    className="barra-propina"
                    style={{ width: `${porcentajePropina}%` }}
                  >
                    Propina
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="mensaje-vacio">
              Introduce el monto de la cuenta para calcular la propina
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
