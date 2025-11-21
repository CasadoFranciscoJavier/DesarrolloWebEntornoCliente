import Casilla from "./Casilla";

import { useContext } from 'react';
import { RuletaContext } from './RuletaContext';

export default function Tablero() {

    const { casillaApostada, casillas, resultadoTirada } = useContext(RuletaContext);

    const fila1 = casillas["FILA 1"].numbers
    const fila2 = casillas["FILA 2"].numbers
    const fila3 = casillas["FILA 3"].numbers

    const claves = [...fila1, ...fila2, ...fila3];

    return (
        <div class="roulette-wrapper">
            <h1>{casillaApostada} - {resultadoTirada}</h1>
            <div class="roulette-board d-grid">

                <Casilla valor={"0"} />

                <div class="numbers-grid d-grid">

                    {claves.map((clave) =>
                        (<Casilla key={clave} valor={clave} />)
                    )}

                </div>

                <div class="column-bets d-grid">
                    <Casilla valor={"FILA 1"} />
                    <Casilla valor={"FILA 2"} />
                    <Casilla valor={"FILA 3"} />
                </div>

                <div class="docenas-grid d-grid">
                    <div class="cell empty"></div>

                    <Casilla valor={"1 - 12"} />
                    <Casilla valor={"13 - 24"} />
                    <Casilla valor={"25 - 36"} />

                    <div class="cell empty"></div>
                </div>

                <div class="outside-bets d-grid">
                    <div class="cell empty"></div>

                    <Casilla valor={"1 - 18"} />
                    <Casilla valor={"PAR"} />
                    <Casilla valor={"ROJO"} />
                    <Casilla valor={"NEGRO"} />
                    <Casilla valor={"IMPAR"} />
                    <Casilla valor={"19 - 36"} />

                    <div class="cell empty"></div>
                </div>

            </div>
        </div>
    )
}