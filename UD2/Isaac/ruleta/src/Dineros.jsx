import { useContext } from 'react';
import { RuletaContext } from './RuletaContext';

export default function Dineros() {

    const STEP_APUESTA = 5;
    const { saldo, importeApostado, setImporteApostado } = useContext(RuletaContext);

    function cambiarApuesta(cantidad) {
        let apuestaNueva = importeApostado + cantidad;

        if (apuestaNueva <= saldo) {
            if (apuestaNueva < STEP_APUESTA) {
                apuestaNueva = STEP_APUESTA
            }
            setImporteApostado(apuestaNueva)
        }
    }

    return (
        <div className='dineros'>
            <div>{saldo}</div>
            <span onClick={() => cambiarApuesta(-STEP_APUESTA)}>➖</span>
            <span>{importeApostado}</span>
            <span onClick={() => cambiarApuesta(STEP_APUESTA)}>➕</span>
        </div>
    )
}