import { API } from "./api.js"

// Obtener todas las películas
export function getAutores(){
    return API.get('/autores')
}

// Obtener detalle de una película
export function getautoresById(id){
    return API.get('/autores/' + id)
}

// Crear nueva película
export function postautores(data){
    return API.post('/autores', data)
}

// Actualizar película
export function putautores(id, data){
    return API.put('/autores/' + id, data)
}

// Eliminar película
export function deleteautores(id){
    return API.delete('/autores/' + id)
}

export function postObras(data){
    return API.post('/obras', data)
}