import { useState } from 'react'
import './App.css'

export default function ListaTareas() {
  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState('')
  const [filtro, setFiltro] = useState('todas')

  function agregarTarea() {
    if (nuevaTarea.trim() === '') return

    const tarea = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false,
      fecha: new Date().toLocaleString()
    }

    setTareas([...tareas, tarea])
    setNuevaTarea('')
  }

  function eliminarTarea(id) {
    setTareas(tareas.filter(tarea => tarea.id !== id))
  }

  function toggleCompletada(id) {
    setTareas(tareas.map(tarea =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    ))
  }

  function editarTarea(id, nuevoTexto) {
    setTareas(tareas.map(tarea =>
      tarea.id === id ? { ...tarea, texto: nuevoTexto } : tarea
    ))
  }

  function eliminarCompletadas() {
    setTareas(tareas.filter(tarea => !tarea.completada))
  }

  function marcarTodasCompletadas() {
    setTareas(tareas.map(tarea => ({ ...tarea, completada: true })))
  }

  function obtenerTareasFiltradas() {
    if (filtro === 'completadas') {
      return tareas.filter(tarea => tarea.completada)
    } else if (filtro === 'pendientes') {
      return tareas.filter(tarea => !tarea.completada)
    }
    return tareas
  }

  function Tarea({ tarea }) {
    const [editando, setEditando] = useState(false)
    const [textoEdit, setTextoEdit] = useState(tarea.texto)

    function guardarEdicion() {
      if (textoEdit.trim() !== '') {
        editarTarea(tarea.id, textoEdit)
      }
      setEditando(false)
    }

    return (
      <div className={`tarea-item ${tarea.completada ? 'completada' : ''}`}>
        <input
          type="checkbox"
          checked={tarea.completada}
          onChange={() => toggleCompletada(tarea.id)}
        />
        {editando ? (
          <input
            type="text"
            value={textoEdit}
            onChange={(e) => setTextoEdit(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                guardarEdicion()
              }
            }}
            autoFocus
          />
        ) : (
          <span className="tarea-texto">{tarea.texto}</span>
        )}
        <span className="tarea-fecha">{tarea.fecha}</span>
        <div className="tarea-botones">
          {editando ? (
            <>
              <button onClick={guardarEdicion} className="btn-guardar">✓</button>
              <button onClick={() => setEditando(false)} className="btn-cancelar">✗</button>
            </>
          ) : (
            <>
              <button onClick={() => setEditando(true)} className="btn-editar">✎</button>
              <button onClick={() => eliminarTarea(tarea.id)} className="btn-eliminar">🗑</button>
            </>
          )}
        </div>
      </div>
    )
  }

  const tareasFiltradas = obtenerTareasFiltradas()
  const tareasCompletadas = tareas.filter(t => t.completada).length
  const tareasPendientes = tareas.filter(t => !t.completada).length

  return (
    <div className="lista-tareas-container">
      <h1>Lista de Tareas</h1>

      <div className="input-nueva-tarea">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              agregarTarea()
            }
          }}
        />
        <button onClick={agregarTarea} className="btn-agregar">
          Agregar
        </button>
      </div>

      <div className="estadisticas">
        <span>Total: {tareas.length}</span>
        <span>Completadas: {tareasCompletadas}</span>
        <span>Pendientes: {tareasPendientes}</span>
      </div>

      <div className="filtros">
        <button
          onClick={() => setFiltro('todas')}
          className={filtro === 'todas' ? 'activo' : ''}
        >
          Todas
        </button>
        <button
          onClick={() => setFiltro('pendientes')}
          className={filtro === 'pendientes' ? 'activo' : ''}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFiltro('completadas')}
          className={filtro === 'completadas' ? 'activo' : ''}
        >
          Completadas
        </button>
      </div>

      <div className="lista-tareas">
        {tareasFiltradas.map(tarea => (
          <Tarea key={tarea.id} tarea={tarea} />
        ))}
        {tareasFiltradas.length === 0 && (
          <p className="sin-tareas">No hay tareas para mostrar</p>
        )}
      </div>

      {tareas.length > 0 && (
        <div className="acciones-masivas">
          <button onClick={marcarTodasCompletadas} className="btn-accion">
            Completar todas
          </button>
          {tareasCompletadas > 0 && (
            <button onClick={eliminarCompletadas} className="btn-accion">
              Eliminar completadas
            </button>
          )}
        </div>
      )}
    </div>
  )
}
