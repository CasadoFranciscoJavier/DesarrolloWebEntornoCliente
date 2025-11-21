import React, { createContext, use, useEffect, useState } from 'react';
import casillas from "./casillas.json";

export const RuletaContext = createContext();

export function RuletaProvider({ children }) {

    const [numeroBola, setNumeroBola] = useState(0);
    const [casillaApostada, setCasillaApostada] = useState("");
    const [importeApostado, setImporteApostado] = useState(5);
    const [resultadoTirada, setResultadoTirada] = useState("");

    const [saldo, setSaldo] = useState(100);

    useEffect(() => {
        comprobarResultado();
    }, [numeroBola]);

    function comprobarResultado() {

        let nuevoSaldo = saldo;

        if(casillaApostada == "") {
            setResultadoTirada("");
        }else if (casillas[casillaApostada].numbers.includes(numeroBola)) { // Uso includes para comprobar si el número de la bola está en el array de números de la casilla apostada
            setResultadoTirada("¡Has ganado!");
            nuevoSaldo = (saldo - importeApostado + importeApostado * casillas[casillaApostada].payout);
        } else {
            setResultadoTirada("Has perdido");
            nuevoSaldo = (saldo - importeApostado);
        }

        if(nuevoSaldo < importeApostado){
            setImporteApostado(nuevoSaldo);
        }

        setSaldo(nuevoSaldo)
    }

    return (
        <RuletaContext.Provider value={{ casillas, numeroBola, setNumeroBola, casillaApostada, setCasillaApostada, resultadoTirada, setResultadoTirada, importeApostado, setImporteApostado, saldo, setSaldo }}>
            {children}
        </RuletaContext.Provider>
    );
}