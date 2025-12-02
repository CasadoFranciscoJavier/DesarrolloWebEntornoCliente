import { API } from "./api.js"

export function getAnimes(numeroPagina = 1){
    return API.get('/anime', {
        params: {
            page: numeroPagina
        }
    })
}


export function getTop10(){
    return API.get('/top/anime')
}

export function getRandomAnime(){
    return API.get('/random/anime')
}

export function getAnimeByID(id){
    return API.get('/anime/'+id)
    // API.get(`/anime/${id}`);
    // API.get(`/anime`, {params: {id: id}});
}