import { useState } from 'react'
import './App.css'

export default function FormularioValidacion() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [edad, setEdad] = useState('')
  const [telefono, setTelefono] = useState('')
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)
  const [tocado, setTocado] = useState({})

  function validarNombre(valor) {
    if (valor.trim() === '') {
      return 'El nombre es obligatorio'
    }
    if (valor.length < 3) {
      return 'El nombre debe tener al menos 3 caracteres'
    }
    if (valor.length > 50) {
      return 'El nombre no puede tener más de 50 caracteres'
    }
    if (!valor.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      return 'El nombre solo puede contener letras y espacios'
    }
    return ''
  }

  function validarEmail(valor) {
    if (valor.trim() === '') {
      return 'El email es obligatorio'
    }
    if (!valor.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return 'El email no es válido'
    }
    return ''
  }

  function validarPassword(valor) {
    if (valor === '') {
      return 'La contraseña es obligatoria'
    }
    if (valor.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres'
    }
    if (!valor.match(/[A-Z]/)) {
      return 'La contraseña debe tener al menos una mayúscula'
    }
    if (!valor.match(/[a-z]/)) {
      return 'La contraseña debe tener al menos una minúscula'
    }
    if (!valor.match(/[0-9]/)) {
      return 'La contraseña debe tener al menos un número'
    }
    if (!valor.match(/[^a-zA-Z0-9]/)) {
      return 'La contraseña debe tener al menos un símbolo especial'
    }
    return ''
  }

  function validarConfirmarPassword(valor) {
    if (valor === '') {
      return 'Debes confirmar tu contraseña'
    }
    if (valor !== password) {
      return 'Las contraseñas no coinciden'
    }
    return ''
  }

  function validarEdad(valor) {
    if (valor === '') {
      return 'La edad es obligatoria'
    }
    const edadNum = parseInt(valor)
    if (isNaN(edadNum)) {
      return 'La edad debe ser un número'
    }
    if (edadNum < 18) {
      return 'Debes ser mayor de 18 años'
    }
    if (edadNum > 120) {
      return 'Edad no válida'
    }
    return ''
  }

  function validarTelefono(valor) {
    if (valor.trim() === '') {
      return 'El teléfono es obligatorio'
    }
    if (!valor.match(/^[0-9]{9}$/)) {
      return 'El teléfono debe tener 9 dígitos'
    }
    return ''
  }

  function validarTerminos(valor) {
    return valor ? '' : 'Debes aceptar los términos y condiciones'
  }

  function validarFormularioCompleto() {
    const nuevosErrores = {
      nombre: validarNombre(nombre),
      email: validarEmail(email),
      password: validarPassword(password),
      confirmarPassword: validarConfirmarPassword(confirmarPassword),
      edad: validarEdad(edad),
      telefono: validarTelefono(telefono),
      terminos: validarTerminos(aceptaTerminos)
    }
    setErrores(nuevosErrores)
    return Object.values(nuevosErrores).every(error => error === '')
  }

  function manejarSubmit(e) {
    e.preventDefault()
    setTocado({
      nombre: true,
      email: true,
      password: true,
      confirmarPassword: true,
      edad: true,
      telefono: true,
      terminos: true
    })

    const esValido = validarFormularioCompleto()

    if (esValido) {
      setEnviado(true)
    }
  }

  function manejarCambioNombre(e) {
    const valor = e.target.value
    setNombre(valor)
    if (tocado.nombre) {
      setErrores({ ...errores, nombre: validarNombre(valor) })
    }
  }

  function manejarCambioEmail(e) {
    const valor = e.target.value
    setEmail(valor)
    if (tocado.email) {
      setErrores({ ...errores, email: validarEmail(valor) })
    }
  }

  function manejarCambioPassword(e) {
    const valor = e.target.value
    setPassword(valor)
    if (tocado.password) {
      setErrores({ ...errores, password: validarPassword(valor) })
    }
    if (tocado.confirmarPassword && confirmarPassword !== '') {
      setErrores({
        ...errores,
        password: validarPassword(valor),
        confirmarPassword: valor !== confirmarPassword ? 'Las contraseñas no coinciden' : ''
      })
    }
  }

  function manejarCambioConfirmarPassword(e) {
    const valor = e.target.value
    setConfirmarPassword(valor)
    if (tocado.confirmarPassword) {
      setErrores({ ...errores, confirmarPassword: validarConfirmarPassword(valor) })
    }
  }

  function manejarCambioEdad(e) {
    const valor = e.target.value
    setEdad(valor)
    if (tocado.edad) {
      setErrores({ ...errores, edad: validarEdad(valor) })
    }
  }

  function manejarCambioTelefono(e) {
    const valor = e.target.value
    setTelefono(valor)
    if (tocado.telefono) {
      setErrores({ ...errores, telefono: validarTelefono(valor) })
    }
  }

  function manejarCambioTerminos(e) {
    const valor = e.target.checked
    setAceptaTerminos(valor)
    if (tocado.terminos) {
      setErrores({ ...errores, terminos: validarTerminos(valor) })
    }
  }

  function marcarTocado(campo) {
    setTocado({ ...tocado, [campo]: true })
  }

  function reiniciarFormulario() {
    setNombre('')
    setEmail('')
    setPassword('')
    setConfirmarPassword('')
    setEdad('')
    setTelefono('')
    setAceptaTerminos(false)
    setErrores({})
    setEnviado(false)
    setTocado({})
  }

  function calcularFortalezaPassword() {
    if (password === '') return 0
    let puntos = 0
    if (password.length >= 8) puntos++
    if (password.length >= 12) puntos++
    if (password.match(/[A-Z]/)) puntos++
    if (password.match(/[a-z]/)) puntos++
    if (password.match(/[0-9]/)) puntos++
    if (password.match(/[^a-zA-Z0-9]/)) puntos++
    return puntos
  }

  function obtenerTextoFortaleza(puntos) {
    if (puntos <= 2) return 'Débil'
    if (puntos <= 4) return 'Media'
    if (puntos <= 5) return 'Fuerte'
    return 'Muy Fuerte'
  }

  const fortalezaPassword = calcularFortalezaPassword()
  const textoFortaleza = obtenerTextoFortaleza(fortalezaPassword)

  return (
    <div className="formulario-container">
      <h1>Formulario de Registro</h1>

      {enviado ? (
        <div className="mensaje-exito">
          <h2>¡Registro exitoso!</h2>
          <div className="datos-enviados">
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Edad:</strong> {edad} años</p>
            <p><strong>Teléfono:</strong> {telefono}</p>
          </div>
          <button onClick={reiniciarFormulario} className="btn-nuevo">
            Nuevo Registro
          </button>
        </div>
      ) : (
        <form onSubmit={manejarSubmit} className="formulario">
          <div className="campo-grupo">
            <label htmlFor="nombre">Nombre completo *</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={manejarCambioNombre}
              onBlur={() => marcarTocado('nombre')}
              className={tocado.nombre && errores.nombre ? 'input-error' : ''}
              placeholder="Juan Pérez"
            />
            {tocado.nombre && errores.nombre && (
              <span className="mensaje-error">{errores.nombre}</span>
            )}
          </div>

          <div className="campo-grupo">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={manejarCambioEmail}
              onBlur={() => marcarTocado('email')}
              className={tocado.email && errores.email ? 'input-error' : ''}
              placeholder="ejemplo@correo.com"
            />
            {tocado.email && errores.email && (
              <span className="mensaje-error">{errores.email}</span>
            )}
          </div>

          <div className="campo-grupo">
            <label htmlFor="password">Contraseña *</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={manejarCambioPassword}
              onBlur={() => marcarTocado('password')}
              className={tocado.password && errores.password ? 'input-error' : ''}
              placeholder="Mínimo 8 caracteres"
            />
            {password && (
              <div className={`fortaleza-password fortaleza-${textoFortaleza.toLowerCase()}`}>
                Fortaleza: {textoFortaleza}
              </div>
            )}
            {tocado.password && errores.password && (
              <span className="mensaje-error">{errores.password}</span>
            )}
          </div>

          <div className="campo-grupo">
            <label htmlFor="confirmarPassword">Confirmar Contraseña *</label>
            <input
              id="confirmarPassword"
              type="password"
              value={confirmarPassword}
              onChange={manejarCambioConfirmarPassword}
              onBlur={() => marcarTocado('confirmarPassword')}
              className={tocado.confirmarPassword && errores.confirmarPassword ? 'input-error' : ''}
              placeholder="Repite tu contraseña"
            />
            {tocado.confirmarPassword && errores.confirmarPassword && (
              <span className="mensaje-error">{errores.confirmarPassword}</span>
            )}
          </div>

          <div className="campo-grupo">
            <label htmlFor="edad">Edad *</label>
            <input
              id="edad"
              type="number"
              value={edad}
              onChange={manejarCambioEdad}
              onBlur={() => marcarTocado('edad')}
              className={tocado.edad && errores.edad ? 'input-error' : ''}
              placeholder="18"
              min="18"
              max="120"
            />
            {tocado.edad && errores.edad && (
              <span className="mensaje-error">{errores.edad}</span>
            )}
          </div>

          <div className="campo-grupo">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              id="telefono"
              type="tel"
              value={telefono}
              onChange={manejarCambioTelefono}
              onBlur={() => marcarTocado('telefono')}
              className={tocado.telefono && errores.telefono ? 'input-error' : ''}
              placeholder="123456789"
              maxLength="9"
            />
            {tocado.telefono && errores.telefono && (
              <span className="mensaje-error">{errores.telefono}</span>
            )}
          </div>

          <div className="campo-grupo-checkbox">
            <label>
              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={manejarCambioTerminos}
                onBlur={() => marcarTocado('terminos')}
              />
              Acepto los términos y condiciones *
            </label>
            {tocado.terminos && errores.terminos && (
              <span className="mensaje-error">{errores.terminos}</span>
            )}
          </div>

          <div className="botones-form">
            <button type="submit" className="btn-enviar">
              Registrarse
            </button>
            <button type="button" onClick={reiniciarFormulario} className="btn-limpiar">
              Limpiar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
