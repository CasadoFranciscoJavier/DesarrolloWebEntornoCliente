import { Link } from 'react-router-dom';

export default function CartaCard({ carta }) {

    return (

        <Link to={`/carta/${carta._id}`}>
            <h2>{carta.nombre} pide {carta.listaRegalos.length} regalos</h2>
            

            

        </Link>

    )
}