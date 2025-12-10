import { useState, useEffect } from "react";
import { getAutores } from "../services/musicaService.js"
import Autorcard from "../components/Autorcard.jsx";

export default function ListarAutores() {

    const [autores, setAutores] = useState([])

    useEffect(() => {
        getAutores()
            .then((response) => {
                console.log(response.data)
                setAutores(response.data)
            })
            .catch((error) => console.error(error))
    }, [])

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Listado de Autores</h2>

            <div className="row">
                {autores.map((autor) => (
                    <Autorcard key={autor.id} autor={autor} />
                ))}
            </div>
        </div>
    );
}