import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../../store/appContext";
import "../questions/questions.css"


export default function Questions() {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [state, setState] = useState({});


    useEffect(() => {
        // actions.getPreguntasByCategoria();
    }, []);

    // Hacer una función handleClick () para que cuando se le de a la opción que el usuario seleccione, ejecute el código que Yoel hizo para que aparezca la correcta y las falladas marcadas.y se sumen en caso de correcta al current streak
    // Deberiamos hacer una función en handleclick siguiente para que se vuelva a cargar la misma vista generando una nueva pregunta random y que se actualicen las medias de los div grises

    return (
        <div className="container-fluid min-vh-100 overflow-hidden mt-3 mb-0 mx-auto">
            <h2 className="m-5 mb-4 px-5 mx-3 text-start" >PRACTICE</h2>
            <div className="container text-start mx-auto px-5 fs-6 text-justify">
                <p className="mb-5">Este parrafo deberia mostrar una pregunta random seleccionada en la categoria que hemos clicado en el dropdown de arriba. Me gustaria que las preguntas se vieran en el centro con con un texto bonito y con el texto justificado ya que lo veran muchas personas y tiene que verse bien bonito. Pruebo escribiendo porque no hay internet y no puedo coger el Lorem Ipsum: </p>
                <div className="text-center">
                    <p className="mb-3">A) Aquí debera ir la respuesta de la pregunta random en el indice 0</p>
                    <p className="mb-3">B) Aquí debera ir la respuesta de la pregunta random en el indice 1</p>
                    <p className="mb-3">C) Aquí debera ir la respuesta de la pregunta random en el indice 2</p>
                    <p className="">D) Aquí debera ir la respuesta de la pregunta random en el indice 3</p>
                </div>
            </div>
            <hr className="m-5"></hr>
            <div className="container-fluid">
                <div className="row d-flex flex-row justify-content-between px-3">
                    <div className="col-4 p-3 mx-5 bg-questions-media rounded d-flex flex-row justify-content-between">
                        <p className="fw-bold">Preguntas acertadas</p>
                        <p className="fw-bold">6</p>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-outline border border-dark btn-lg align-self-end px-5">Siguiente</button>
                    </div>
                </div>
                <div className="row d-flex flex-row justify-content-between my-4 px-3">
                    <div className="col-4 p-3 mx-5 bg-questions-media rounded d-flex flex-row justify-content-between">
                        <p className="fw-bold">Media de preguntas acertadas</p>
                        <p className="fw-bold">6</p>
                    </div>
                </div>
            </div>
        </div>
    )

}