import { useState } from "react";
import { postCarta } from "../services/cartaService.js"
import { useNavigate } from "react-router-dom";

const cartaVacia = {
    _id: "",
    nombre: "",
    direccion: "",
    listaRegalos: []
}

export default function CrearCarta() {

    const navigate = useNavigate();

    const [carta, setCarta] = useState(cartaVacia);

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
        postCarta(carta)
            .then((response) => navigate("/carta/"+response.data._id))
            .catch((error) => console.error(error)); 
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Nombre: <input name="nombre" type="text" onChange={handleChange} /></label>
                <label>Direccion: <input name="direccion" type="text" onChange={handleChange} /></label>
                <label>Regalos (uno por linea): <textarea onChange={leerRegalos}></textarea></label>.
                <input type="submit" />
            </form>
        </>
    )
}