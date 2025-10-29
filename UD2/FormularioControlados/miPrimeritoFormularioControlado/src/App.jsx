import { useState } from 'react'
import './App.css'





function validarNombre(nombre) {
  let mensaje = ""
  if (!nombre) mensaje = 'El nombre es obligatorio.'
  else if (nombre.length < 3) mensaje = 'El nombre debe tener al menos 3 caracteres.'
  else if (nombre.length > 50) mensaje = 'El nombre no puede superar los 50 caracteres.'
  return mensaje
}

function validarEdad(edad) {
  let mensaje = ""
  if (!edad) mensaje = 'La edad es obligatoria.'
  else if (edad < 0 || edad > 120) mensaje = 'Edad inválida.'
  return mensaje
}

function validarEmail(email) {
  let mensaje = ""
  if (!email) mensaje = 'El email es obligatorio.'
  else {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(email)) mensaje = 'Email no válido.'
  }
  return mensaje
}



function MiPrimeritoFormulario() {
  const [form, setForm] = useState({
    nombre: '',
    edad: '',
    email: '',
    contrasenia: ''
  })

  const [errores, setErrores] = useState({
    nombre: '',
    edad: '',
    email: '',
    contrasenia: ''
  })

  

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    let mensajeError = ''
    if (name == 'nombre') mensajeError = validarNombre(value)
    if (name == 'edad') mensajeError = validarEdad(value)
    if (name == 'email') mensajeError = validarEmail(value)
    

    setErrores({ ...errores, [name]: mensajeError })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (errores) {
      console.log('Existen errores en el formulario')
    } else {
      console.log('Datos enviados:', form)
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
        {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}
      </div>

      <div>
        <label>Edad:</label>
        <input type="number" name="edad" value={form.edad} onChange={handleChange} />
        {errores.edad && <p style={{ color: 'red' }}>{errores.edad}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        {errores.email && <p style={{ color: 'red' }}>{errores.email}</p>}
      </div>

      <div>
        <label>Contraseña:</label>
        <input type="password" name="contrasenia" value={form.contrasenia} onChange={handleChange} />
      </div>

      <button type="submit">Enviar</button>
    </form>
  )
}

export default MiPrimeritoFormulario
