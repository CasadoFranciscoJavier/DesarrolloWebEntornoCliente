import ruleta from "./assets/ruleta.png"
import palanca from "./assets/palanca.png"

import { useContext, useState } from 'react';
import { RuletaContext } from './RuletaContext';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Ruleta() {

    const { numeroBola, setNumeroBola, saldo } = useContext(RuletaContext);
    const [girando, setGirando] = useState("");

    function tiradaRuleta() {

        if (girando != "girando" && saldo > 0) {
            setGirando("girando");

            setTimeout(() => {
                let numeroGenerado = getRandomInt(0, 36);
                setNumeroBola(numeroGenerado);

                setGirando("");

            }, 3000);
        }

    }

    return (
        <>
            <div class="col-5">
                <img className={`img-fluid ${girando}`} src={ruleta} />
            </div>
            <div class="col-3">
                <img class="img-fluid" src={palanca} onClick={tiradaRuleta} />
            </div>
            <div class="col-3">
                <p className="resultado">{numeroBola}</p>
            </div>
        </>
    )
}