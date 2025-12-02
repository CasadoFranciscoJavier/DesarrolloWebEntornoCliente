import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
import { getCartaByID } from "../services/cartaService.js"
import CartaCard from "../components/cartaCard.jsx";

const cartaVacia = {
    _id: "",
    nombre: "",
    direccion: "",
    listaRegalos: []
}

export default function DetalleCarta() {

    const { id } = useParams();
    const [carta, setCarta] = useState(cartaVacia)

    useEffect(() => {
        console.log(id)

        getCartaByID(id)
            .then((response) => setCarta(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <CartaCard carta = { carta } />

            <p><strong>Nombre:</strong> {carta.nombre}</p>
            <p><strong>Dirección:</strong> {carta.direccion}</p>

            <div>
              
                    <strong>Lista de regalos:</strong>
                     
                    <ol>
                        {carta.listaRegalos.map((regalo, index) => (
                            <li key={index}>{regalo}</li>
                        ))}
                    </ol>
           
            </div>
            <Link to={`/carta/${id}/editar`}>
                <button>Editar carta</button>
            </Link>
        </>
    )
}