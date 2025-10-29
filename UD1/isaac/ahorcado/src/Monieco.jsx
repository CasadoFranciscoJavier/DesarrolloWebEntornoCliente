import ahorcado1 from"./img/ahorcado1.jpg"
import ahorcado2 from"./img/ahorcado2.jpg"
import ahorcado3 from"./img/ahorcado3.jpg"
import ahorcado4 from"./img/ahorcado4.jpg"
import ahorcado5 from"./img/ahorcado5.jpg"
import ahorcado6 from"./img/ahorcado6.jpg"

const fotos = [ahorcado1, ahorcado2, ahorcado3, ahorcado4, ahorcado5, ahorcado6]

export default function Monieco({fallos}){
    return(
        <img src={fotos[fallos]}></img>
    )
}