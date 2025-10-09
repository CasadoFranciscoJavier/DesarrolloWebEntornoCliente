import { useState } from 'react'
import './App.css'

export default function CalculadoraIMC() {
  const [sistemaUnidades, setSistemaUnidades] = useState('metrico')
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [edad, setEdad] = useState('')
  const [genero, setGenero] = useState('masculino')
  const [historial, setHistorial] = useState([])

  const categoriasIMC = [
    { nombre: 'Bajo peso', min: 0, max: 18.5, color: '#3498db', consejo: 'Considera consultar a un nutricionista para alcanzar un peso saludable.' },
    { nombre: 'Peso normal', min: 18.5, max: 25, color: '#2ecc71', consejo: 'Mantén tu estilo de vida saludable con dieta balanceada y ejercicio regular.' },
    { nombre: 'Sobrepeso', min: 25, max: 30, color: '#f39c12', consejo: 'Considera incrementar actividad física y mejorar hábitos alimenticios.' },
    { nombre: 'Obesidad I', min: 30, max: 35, color: '#e67e22', consejo: 'Recomendable consultar con un profesional de la salud para un plan personalizado.' },
    { nombre: 'Obesidad II', min: 35, max: 40, color: '#e74c3c', consejo: 'Es importante buscar orientación médica para mejorar tu salud.' },
    { nombre: 'Obesidad III', min: 40, max: 999, color: '#c0392b', consejo: 'Consulta urgentemente con un médico para evaluar opciones de tratamiento.' }
  ]

  function calcularIMC() {
    const pesoNum = parseFloat(peso)
    const alturaNum = parseFloat(altura)

    if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      return null
    }

    if (sistemaUnidades === 'metrico') {
      const alturaMetros = alturaNum / 100
      return pesoNum / (alturaMetros * alturaMetros)
    } else {
      return (pesoNum / (alturaNum * alturaNum)) * 703
    }
  }

  function obtenerCategoria(imc) {
    if (imc === null) return null

    const categoria = categoriasIMC.find(cat => imc >= cat.min && imc < cat.max)
    return categoria || categoriasIMC[categoriasIMC.length - 1]
  }

  function calcularPesoIdeal() {
    const alturaNum = parseFloat(altura)
    if (isNaN(alturaNum) || alturaNum <= 0) return null

    const alturaMetros = sistemaUnidades === 'metrico' ? alturaNum / 100 : alturaNum * 0.0254
    const imcIdeal = 22
    const pesoIdeal = imcIdeal * (alturaMetros * alturaMetros)

    return sistemaUnidades === 'metrico' ? pesoIdeal : pesoIdeal * 2.20462
  }

  function calcularDiferenciaPesoIdeal() {
    const pesoNum = parseFloat(peso)
    const pesoIdeal = calcularPesoIdeal()

    if (pesoIdeal === null || isNaN(pesoNum)) return null

    return pesoNum - pesoIdeal
  }

  function manejarCambioPeso(e) {
    const valor = e.target.value
    if (valor === '' || parseFloat(valor) >= 0) {
      setPeso(valor)
    }
  }

  function manejarCambioAltura(e) {
    const valor = e.target.value
    if (valor === '' || parseFloat(valor) >= 0) {
      setAltura(valor)
    }
  }

  function manejarCambioEdad(e) {
    const valor = e.target.value
    if (valor === '' || (parseInt(valor) >= 0 && parseInt(valor) <= 120)) {
      setEdad(valor)
    }
  }

  function cambiarSistemaUnidades(nuevoSistema) {
    if (nuevoSistema === sistemaUnidades) return

    const pesoNum = parseFloat(peso)
    const alturaNum = parseFloat(altura)

    if (nuevoSistema === 'imperial') {
      if (!isNaN(pesoNum)) {
        setPeso((pesoNum * 2.20462).toFixed(1))
      }
      if (!isNaN(alturaNum)) {
        setAltura((alturaNum * 0.393701).toFixed(1))
      }
    } else {
      if (!isNaN(pesoNum)) {
        setPeso((pesoNum / 2.20462).toFixed(1))
      }
      if (!isNaN(alturaNum)) {
        setAltura((alturaNum / 0.393701).toFixed(1))
      }
    }

    setSistemaUnidades(nuevoSistema)
  }

  function guardarEnHistorial() {
    const imc = calcularIMC()
    if (imc === null) return

    const categoria = obtenerCategoria(imc)
    const nuevaEntrada = {
      id: Date.now(),
      imc: imc.toFixed(1),
      categoria: categoria.nombre,
      peso: parseFloat(peso),
      altura: parseFloat(altura),
      sistema: sistemaUnidades,
      fecha: new Date().toLocaleString(),
      edad: edad !== '' ? parseInt(edad) : null,
      genero: genero
    }

    const nuevoHistorial = [nuevaEntrada, ...historial].slice(0, 10)
    setHistorial(nuevoHistorial)
  }

  function limpiarHistorial() {
    setHistorial([])
  }

  function resetear() {
    setPeso('')
    setAltura('')
    setEdad('')
    setGenero('masculino')
  }

  function obtenerPosicionIndicador(imc) {
    if (imc < 18.5) return (imc / 18.5) * 16.66
    if (imc < 25) return 16.66 + ((imc - 18.5) / (25 - 18.5)) * 16.66
    if (imc < 30) return 33.32 + ((imc - 25) / (30 - 25)) * 16.66
    if (imc < 35) return 49.98 + ((imc - 30) / (35 - 30)) * 16.66
    if (imc < 40) return 66.64 + ((imc - 35) / (40 - 35)) * 16.66
    return Math.min(83.3 + ((imc - 40) / 10) * 16.66, 100)
  }

  const imc = calcularIMC()
  const categoria = obtenerCategoria(imc)
  const pesoIdeal = calcularPesoIdeal()
  const diferenciaPeso = calcularDiferenciaPesoIdeal()
  const unidadPeso = sistemaUnidades === 'metrico' ? 'kg' : 'lb'
  const unidadAltura = sistemaUnidades === 'metrico' ? 'cm' : 'in'

  return (
    <div className="calculadora-imc-container">
      <h1>Calculadora de IMC</h1>

      <div className="sistema-toggle">
        <button
          onClick={() => cambiarSistemaUnidades('metrico')}
          className={sistemaUnidades === 'metrico' ? 'activo' : ''}
        >
          Métrico (kg/cm)
        </button>
        <button
          onClick={() => cambiarSistemaUnidades('imperial')}
          className={sistemaUnidades === 'imperial' ? 'activo' : ''}
        >
          Imperial (lb/in)
        </button>
      </div>

      <div className="calculadora-grid">
        <div className="seccion-entrada">
          <h2>Datos Personales</h2>

          <div className="input-grupo">
            <label>Peso ({unidadPeso})</label>
            <input
              type="number"
              value={peso}
              onChange={manejarCambioPeso}
              placeholder={`Ej: ${sistemaUnidades === 'metrico' ? '70' : '154'}`}
              step="0.1"
            />
          </div>

          <div className="input-grupo">
            <label>Altura ({unidadAltura})</label>
            <input
              type="number"
              value={altura}
              onChange={manejarCambioAltura}
              placeholder={`Ej: ${sistemaUnidades === 'metrico' ? '170' : '67'}`}
              step="0.1"
            />
          </div>

          <div className="input-grupo">
            <label>Edad (opcional)</label>
            <input
              type="number"
              value={edad}
              onChange={manejarCambioEdad}
              placeholder="Ej: 30"
              min="0"
              max="120"
            />
          </div>

          <div className="input-grupo">
            <label>Género</label>
            <select value={genero} onChange={(e) => setGenero(e.target.value)}>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>

          <div className="botones-accion">
            {imc !== null && (
              <button onClick={guardarEnHistorial} className="btn-guardar">
                Guardar en Historial
              </button>
            )}
            <button onClick={resetear} className="btn-resetear">
              Limpiar Campos
            </button>
          </div>
        </div>

        <div className="seccion-resultados">
          {imc !== null && categoria ? (
            <>
              <div className="resultado-principal" style={{ borderColor: categoria.color }}>
                <div className="imc-valor" style={{ color: categoria.color }}>
                  {imc.toFixed(1)}
                </div>
                <div className="imc-label">Índice de Masa Corporal</div>
              </div>

              <div className="categoria-info" style={{ backgroundColor: categoria.color + '20', borderColor: categoria.color }}>
                <h3 style={{ color: categoria.color }}>{categoria.nombre}</h3>
                <p>{categoria.consejo}</p>
              </div>

              <div className="indicador-visual">
                <div className="barra-categorias">
                  {categoriasIMC.map((cat, index) => (
                    <div
                      key={index}
                      className="segmento-categoria"
                      style={{ backgroundColor: cat.color }}
                      title={cat.nombre}
                    ></div>
                  ))}
                </div>
                <div
                  className="marcador-imc"
                  style={{ left: `${obtenerPosicionIndicador(imc)}%` }}
                >
                  ▼
                </div>
                <div className="etiquetas-rango">
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>35</span>
                  <span>40</span>
                </div>
              </div>

              {pesoIdeal !== null && (
                <div className="info-peso-ideal">
                  <h4>Rango de Peso Saludable</h4>
                  <p>
                    Tu peso ideal aproximado: <strong>{pesoIdeal.toFixed(1)} {unidadPeso}</strong>
                  </p>
                  {diferenciaPeso !== null && (
                    <p className={diferenciaPeso > 0 ? 'exceso' : 'deficit'}>
                      {diferenciaPeso > 0
                        ? `Exceso: +${Math.abs(diferenciaPeso).toFixed(1)} ${unidadPeso}`
                        : diferenciaPeso < 0
                        ? `Déficit: -${Math.abs(diferenciaPeso).toFixed(1)} ${unidadPeso}`
                        : 'Estás en tu peso ideal'
                      }
                    </p>
                  )}
                </div>
              )}

              <div className="tabla-referencia">
                <h4>Tabla de Referencia OMS</h4>
                {categoriasIMC.map((cat, index) => (
                  <div
                    key={index}
                    className={`fila-categoria ${categoria.nombre === cat.nombre ? 'actual' : ''}`}
                  >
                    <div className="color-indicador" style={{ backgroundColor: cat.color }}></div>
                    <div className="nombre-categoria">{cat.nombre}</div>
                    <div className="rango-categoria">
                      {cat.min.toFixed(1)} - {cat.max === 999 ? '+' : cat.max.toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mensaje-inicial">
              <p>Introduce tu peso y altura para calcular tu IMC</p>
            </div>
          )}
        </div>
      </div>

      {historial.length > 0 && (
        <div className="seccion-historial">
          <div className="historial-header">
            <h3>Historial de Mediciones</h3>
            <button onClick={limpiarHistorial} className="btn-limpiar-historial">
              Limpiar Historial
            </button>
          </div>
          <div className="historial-lista">
            {historial.map((entrada) => (
              <div key={entrada.id} className="entrada-historial">
                <div className="entrada-fecha">{entrada.fecha}</div>
                <div className="entrada-datos">
                  <span className="imc-historial">{entrada.imc}</span>
                  <span className="categoria-historial">{entrada.categoria}</span>
                  <span className="medidas-historial">
                    {entrada.peso} {entrada.sistema === 'metrico' ? 'kg' : 'lb'} / {entrada.altura} {entrada.sistema === 'metrico' ? 'cm' : 'in'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
