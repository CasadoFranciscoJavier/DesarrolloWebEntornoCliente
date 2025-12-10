import { useState, useEffect } from "react";
import {useParams, useNavigate } from "react-router-dom";
import { getautoresById, putautores } from "../services/musicaService.js";


const autorVacio = {
    foto_url: '',
    nombre: '',
    pais: '',
    periodo: ''
   
}

export default function Editar() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [autor, setAutor] = useState(autorVacio);

    const PERIODOS = ['Renacimiento', 'Renacimiento tardío', 'Barroco temprano', 'Barroco', 'Clasicismo', 'Romanticismo'];

  

    useEffect(() => {
        getautoresById(id)
            .then((response) => setAutor(response.data))  
            .catch((error) => console.error(error));
    }, [id]);

    function handleChange(input) {
        const { name, value } = input.target;
        setAutor({
            ...autor,
            [name]: value
        });
        console.log(autor)
    } 


    function handlePeriodoChange(periodo) {
  setAutor({
    ...autor,
    periodo: periodo
  });
}


    function handleSubmit(form) {
        form.preventDefault();
        
            putautores(id, autor)
                .then((response) => navigate(`/autores/${response.data.id}`))
                .catch((error) => console.error(error));
        
    }
    const img = autor.foto_url

    return (


        <div className="container mt-4">


            <div className="row">

      
                <div className="col-lg-8 col-md-7 col-12 ">
                    <h2 className="mb-4">Registrar Autor</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label"><strong>URL Póster:</strong></label>
                            <input
                                type="url"
                                name="foto_url"
                                className="form-control"
                                value={img}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="mb-3">
                            <label className="form-label"><strong>Nombre: </strong></label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                value={autor.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><strong>Pais: </strong></label>
                            <input
                                type="text"
                                name="pais"
                                className="form-control"
                                value={autor.pais}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><strong>Periodo: </strong></label>
                            <div className="row">
                                {PERIODOS.map((periodo) => (
                                    <div key={periodo} className="col-6 col-md-3">
                                        <div >
                                            <input
                                                type="radio"
                                                name="periodo"
                                                className="form-check-input"
                                                checked={autor.periodo == periodo}
                                                onChange={() => handlePeriodoChange(periodo)}
                                            />
                                            <label className="form-check-label">{periodo}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary">
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate(`/`)}
                            >
                                Cancelar
                            </button>
                        </div>

                    </form>
                </div>

   
                <div className="col-lg-4 col-md-5 col-12 text-center">
                    {img && (
                        <img
                            src={img}
                            alt={autor.title}
                            className="img-fluid rounded"
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                    )}
                </div>

            </div>
        </div>

    );
}
