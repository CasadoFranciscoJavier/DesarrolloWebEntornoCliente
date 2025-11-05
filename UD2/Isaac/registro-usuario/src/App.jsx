import { useEffect, useState } from 'react'

function App() {

  const [usuario, setUsuario] = useState({
    nombre: '',
    edad: 0,
    email: '',
    password: ''
  })

  const [mensajeNombre, setMensajeNombre] = useState('');
  const [mensajeEdad, setMensajeEdad] = useState('');
  const [mensajeEmail, setMensajeEmail] = useState('');
  const [mensajePassword, setMensajePassword] = useState('');

  useEffect(() => {
    setMensajeNombre(
      validarNombre() ? '' : 'El nombre debe tener una longitud de entre 3 y 50 caracteres'
    )

    setMensajeEdad(
      validarEdad() ? '' : 'La edad debe estar entre 0 y 120'
    )

    setMensajeEmail(
      validarEmail() ? '' : 'Email incorrecto'
    )

    validarPassword()
  }, [usuario]);

  function leerInput(input) {
    const { name, value } = input.target //Saco el name y el value del input
    setUsuario({
      ...usuario,
      [name]: value
    })
  }

  function validarNombre() {
    return (usuario.nombre.length >= 3 && usuario.nombre.length <= 50)
  }

  function validarEdad() {
    return (usuario.edad >= 0 && usuario.edad <= 120)
  }

  function validarEmail() {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(usuario.email)
  }

  function validarPassword() {
    let tieneMayuscula = /[A-Z]+/;
    let tieneMinuscula = /[a-z]+/;
    let tieneNumero = /\d+/;
    let longitudCorrecta = (usuario.password.length >= 6 && usuario.password.length <= 20)

    if (!tieneMayuscula.test(usuario.password)) {
      setMensajePassword('La contraseña debe tener mayúsculas')
    }
    else if (!tieneMinuscula.test(usuario.password)) {
      setMensajePassword('La contraseña debe tener minúsculas')
    }
    else if (!tieneNumero.test(usuario.password)) {
      setMensajePassword('La contraseña debe tener numeros')
    }
    else if (!longitudCorrecta) {
      setMensajePassword('La contraseña debe tener una longitud de 6 a 20 caracteres')
    }
    else {
      setMensajePassword('')
    }

    return (tieneMayuscula.test(usuario.password) 
        && tieneMinuscula.test(usuario.password)
        && tieneNumero.test(usuario.password)
        && longitudCorrecta)
  }

  function enviarFormulario(formulario) {
    formulario.preventDefault()
    if (validarNombre() && validarEdad() && validarEmail() && validarPassword()) {
      console.log('Datos enviados:', usuario)
    }

  }

  return (
    <form onSubmit={enviarFormulario}>
      <label>Nombre: <input name="nombre" type="text" onChange={leerInput} /></label><br />
      {mensajeNombre} <br />

      <label>Edad: <input name="edad" type="number" onChange={leerInput} /></label><br />
      {mensajeEdad} <br />

      <label>Email: <input name="email" type="text" onChange={leerInput} /></label><br />
      {mensajeEmail} <br />

      <label>Contraseña: <input name="password" type="password" onChange={leerInput} /></label><br />
      {mensajePassword} <br />

      <input type="submit" />
    </form>
  )
}

export default App
