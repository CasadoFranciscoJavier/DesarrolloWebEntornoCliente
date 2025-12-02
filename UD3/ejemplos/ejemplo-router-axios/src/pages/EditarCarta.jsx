import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { getCartaByID } from "../services/cartaService.js"
import { putCarta } from "../services/cartaService.js"

const cartaVacia = {
    _id: "",
    nombre: "",
    direccion: "",
    listaRegalos: []
}

export default function EditarCarta() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [carta, setCarta] = useState(cartaVacia);

    useEffect(() => {
        getCartaByID(id)
            .then((response) => setCarta(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    function handleChange(input) {
        const { name, value } = input.target;
        setCarta({
            ...carta,
            [name]: value
        });
    };

    function leerRegalos(input) {
        const { value } = input.target

        const listaRegalosInput = value.split("\n")

        setCarta({
            ...carta,
            listaRegalos: listaRegalosInput
        });
    };

    function handleSubmit(form){
        form.preventDefault();
        putCarta(carta)
            .then((response) => navigate("/carta/"+response.data._id))
            .catch((error) => console.error(error)); 
    };

    return (
        <>
            <h1>Editar Carta</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre: <input name="nombre" type="text" value={carta.nombre} onChange={handleChange} /></label>
                <label>Direccion: <input name="direccion" type="text" value={carta.direccion} onChange={handleChange} /></label>
                <label>Regalos (uno por linea): <textarea value={carta.listaRegalos.join("\n")} onChange={leerRegalos}></textarea></label>
                <input type="submit" value="Guardar cambios" />
            </form>
        </>
    )
}