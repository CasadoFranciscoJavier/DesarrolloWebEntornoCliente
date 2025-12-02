import { useState, useEffect } from "react";
import { getCartas } from "../services/cartaService.js"
import CartaCard from "../components/cartaCard.jsx";

export default function ListaCartas() {

    const [cartas, setCartas] = useState([])

    // Hook useEffect para cargar datos al montar el componente
    useEffect(() => {
        getCartas()
            .then((response) => setCartas(response.data)) // Actualiza el estado con los datos recibidos
            .catch((error) => console.error(error)); // Manejo de errores
    }, []);

    return (
        <div>
            <h2>Cartas a los Reyes Magos</h2>
            <ul>
                {/* Renderiza los datos de la API */}
                {cartas.map((carta) => (
                    <CartaCard key={carta._id} carta = { carta } />
                ))}
            </ul>
        </div>
    );
}