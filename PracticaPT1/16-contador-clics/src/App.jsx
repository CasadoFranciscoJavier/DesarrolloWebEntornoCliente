import { useState, useEffect } from 'react'
import './App.css'

export default function ContadorClics() {
  const [contadores, setContadores] = useState([
    { id: 1, nombre: 'Contador 1', valor: 0, incremento: 1 }
  ])
  const [nuevoNombre, setNuevoNombre] = useState('')

  function agregarContador() {
    const nombre = nuevoNombre.trim() !== '' ? nuevoNombre : `Contador ${contadores.length + 1}`
    const nuevoContador = {
      id: Date.now(),
      nombre: nombre,
      valor: 0,
      incremento: 1
    }
    setContadores([...contadores, nuevoContador])
    setNuevoNombre('')
  }

  function incrementar(id) {
    setContadores(contadores.map(c =>
      c.id === id ? { ...c, valor: c.valor + c.incremento } : c
    ))
  }

  function decrementar(id) {
    setContadores(contadores.map(c =>
      c.id === id ? { ...c, valor: c.valor - c.incremento } : c
    ))
  }

  function reiniciar(id) {
    setContadores(contadores.map(c =>
      c.id === id ? { ...c, valor: 0 } : c
    ))
  }

  function eliminar(id) {
    setContadores(contadores.filter(c => c.id !== id))
  }

  function cambiarIncremento(id, nuevoIncremento) {
    const incremento = parseInt(nuevoIncremento)
    if (!isNaN(incremento) && incremento > 0) {
      setContadores(contadores.map(c =>
        c.id === id ? { ...c, incremento: incremento } : c
      ))
    }
  }

  function cambiarNombre(id, nuevoNombre) {
    setContadores(contadores.map(c =>
      c.id === id ? { ...c, nombre: nuevoNombre } : c
    ))
  }

  function reiniciarTodos() {
    setContadores(contadores.map(c => ({ ...c, valor: 0 })))
  }

  function Contador({ contador }) {
    const [editandoNombre, setEditandoNombre] = useState(false)
    const [nombreTemp, setNombreTemp] = useState(contador.nombre)

    function guardarNombre() {
      if (nombreTemp.trim() !== '') {
        cambiarNombre(contador.id, nombreTemp)
      }
      setEditandoNombre(false)
    }

    return (
      <div className="contador-card">
        <div className="contador-header">
          {editandoNombre ? (
            <input
              type="text"
              value={nombreTemp}
              onChange={(e) => setNombreTemp(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  guardarNombre()
                }
              }}
              onBlur={guardarNombre}
              autoFocus
            />
          ) : (
            <h3 onClick={() => setEditandoNombre(true)}>{contador.nombre}</h3>
          )}
          {contadores.length > 1 && (
            <button onClick={() => eliminar(contador.id)} className="btn-eliminar-contador">
              ✗
            </button>
          )}
        </div>

        <div className="contador-valor">
          {contador.valor}
        </div>

        <div className="contador-config">
          <label>
            Incremento:
            <input
              type="number"
              value={contador.incremento}
              onChange={(e) => cambiarIncremento(contador.id, e.target.value)}
              min="1"
            />
          </label>
        </div>

        <div className="contador-botones">
          <button onClick={() => decrementar(contador.id)} className="btn-decrementar">
            -
          </button>
          <button onClick={() => incrementar(contador.id)} className="btn-incrementar">
            +
          </button>
          <button onClick={() => reiniciar(contador.id)} className="btn-reiniciar-individual">
            Reset
          </button>
        </div>
      </div>
    )
  }

  const totalClics = contadores.reduce((acc, c) => acc + c.valor, 0)

  return (
    <div className="contador-clics-container">
      <h1>Contador de Clics</h1>

      <div className="info-global">
        <h2>Total de clics: {totalClics}</h2>
        <p>Contadores activos: {contadores.length}</p>
      </div>

      <div className="agregar-contador">
        <input
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          placeholder="Nombre del contador (opcional)"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              agregarContador()
            }
          }}
        />
        <button onClick={agregarContador} className="btn-agregar">
          Agregar Contador
        </button>
      </div>

      <div className="contadores-grid">
        {contadores.map(contador => (
          <Contador key={contador.id} contador={contador} />
        ))}
      </div>

      {contadores.length > 1 && (
        <div className="acciones-globales">
          <button onClick={reiniciarTodos} className="btn-reiniciar-todos">
            Reiniciar Todos
          </button>
        </div>
      )}
    </div>
  )
}
