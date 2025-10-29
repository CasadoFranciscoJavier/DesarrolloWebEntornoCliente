export default function Jugador({jugador, estadoJugador, disparar}){
    return(
        <>
        <p>{estadoJugador ? "🍔" : "💀"}</p>
        <button onClick={disparar}>El jugador {jugador} se pega un tiro (o no)</button>
        </>
    )
}