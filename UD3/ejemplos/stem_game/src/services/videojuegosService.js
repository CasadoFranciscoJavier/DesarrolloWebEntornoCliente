import { API } from "./api.js"

// CRUD Compañías
export function getCompanias(){
    return API.get('/companias')
}

export function getCompaniaById(id){
    return API.get('/companias/' + id)
}

export function postCompania(data){
    return API.post('/companias', data)
}

export function putCompania(id, data){
    return API.put('/companias/' + id, data)
}

export function deleteCompania(id){
    return API.delete('/companias/' + id)
}

// CRUD Juegos
export function postJuego(data){
    return API.post('/juegos', data)
}

export function putJuego(id, data){
    return API.put('/juegos/' + id, data)
}

export function deleteJuego(id){
    return API.delete('/juegos/' + id)
}
