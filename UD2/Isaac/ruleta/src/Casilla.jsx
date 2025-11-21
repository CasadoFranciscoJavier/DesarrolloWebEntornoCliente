import { useContext } from 'react';
import { RuletaContext } from './RuletaContext';

export default function Casilla({ valor }) {

    const { casillas, setCasillaApostada } = useContext(RuletaContext);

    let clase = casillas[valor].clase

    return (
        <div
            className={`cell ${clase}`}
            onClick={() => setCasillaApostada(valor)}>
            {valor}
        </div>
    )
}