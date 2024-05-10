import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../../store/appContext";
import "../questions/questions.css"


export default function Questions() {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)

    const [pregunta, setPregunta] = useState(null)
    const [clases, setClases] = useState(["", "", "", ""])
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(false)
    const [count, setCount] = useState(0)
    const [aciertos, setAciertos] = useState(0)
    const [preguntaFallada, setPreguntaFallada] = useState(null)

    useEffect(() => {
        const random = Math.floor(Math.random() * (store.preguntasSeleccionadas.length))
        const preguntaRandom = store.preguntasSeleccionadas[random]
        setPregunta(preguntaRandom)
        setRespuestaSeleccionada(false)
    }, [])

    useEffect(() => {
        setClases(["", "", "", ""])
        setRespuestaSeleccionada(false)
    }, [pregunta])

    const handleNext = () => {
        if (count % 4 == 0 && store.estadisticaSeleccionada.preguntas_falladas.length > 0) {
            const random = Math.floor(Math.random() * (store.estadisticaSeleccionada.preguntas_falladas.length))
            const preguntaRandom = store.estadisticaSeleccionada.preguntas_falladas[random]
            const mapaPreguntas = {}
            store.preguntasSeleccionadas.forEach(pregunta => {
                mapaPreguntas[pregunta.id] = pregunta
            })
            const preguntaFinal = mapaPreguntas[preguntaRandom.pregunta_id]
            setPreguntaFallada(preguntaFinal.id)
            setPregunta(preguntaFinal)
            setRespuestaSeleccionada(false)
        }
        else {
            const random = Math.floor(Math.random() * (store.preguntasSeleccionadas.length))
            const preguntaRandom = store.preguntasSeleccionadas[random]
            setPregunta(preguntaRandom)
            setRespuestaSeleccionada(false)
        }
    }

    const resolve = async(index, item) => {
        const nuevasClases = [...clases]
        if (item.correct === true) {
            nuevasClases[index] = "success"
            setAciertos((prevState) => prevState + 1)
            setCount((prevState) => prevState + 1)
            if (preguntaFallada) {
                const response = await actions.actualizarFallosPractica(preguntaFallada, store.estadisticaSeleccionada.id, store.estudiante.id)
                console.log(response)
                setPreguntaFallada(null);
            }
        }
        else {
            nuevasClases[index] = "wrong"
            if (preguntaFallada) {
                setPreguntaFallada(null)
            }
            pregunta.Respuestas.map((resp, indx) => {
                if (resp.correct === true) {
                    nuevasClases[indx] = "success"
                }
            })
            setCount((prevState) => prevState + 1)
        }
        setClases(nuevasClases)
        setRespuestaSeleccionada(true)
    }


    // Hacer una función handleClick () para que cuando se le de a la opción que el usuario seleccione, ejecute el código que Yoel hizo para que aparezca la correcta y las falladas marcadas.y se sumen en caso de correcta al current streak
    // Deberiamos hacer una función en handleclick siguiente para que se vuelva a cargar la misma vista generando una nueva pregunta random y que se actualicen las medias de los div grises.

    // Deberiamos hacer una ruta dinámica en router.js para que depende de que categoria de las que ha seleccionado el usuario se haga una ruta dependiendo del id para que se cojan las preguntas del endpoint.

    return (
        <div className="container-fluid min-vh-100 overflow-hidden mt-3 mb-0 mx-auto">
            <h2 className="m-5 mb-4 px-5 mx-3 text-start" >PRACTICA</h2>
            {pregunta && (<div className="container text-start mx-auto px-5 fs-6 text-justify">
                <div className="mb-5"><h1>{Object.keys(pregunta)[0]}: </h1><h2>{Object.values(pregunta)[0]}</h2> </div>
                <ul>
                    {pregunta && pregunta.Respuestas.map((item, index) => {
                        return (
                            <li style={respuestaSeleccionada ? { pointerEvents: 'none' } : {}} key={index} onClick={() => resolve(index, item)} className={`my-2 ${clases[index]}`} ><b>{Object.keys(item)[0]}:</b> {Object.values(item)[0]}</li>
                        )
                    })}
                </ul>
            </div>)}
            <hr className="m-5"></hr>
            <div className="container-fluid">
                <div className="row d-flex flex-row justify-content-between px-3">
                    <div className="col-4 p-3 mx-5 bg-questions-media rounded d-flex flex-row justify-content-between">
                        <p className="fw-bold">Preguntas acertadas</p>
                        <p className="fw-bold">{aciertos} / {count}</p>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-outline border border-dark btn-lg align-self-end px-5" onClick={() => handleNext()}>Siguiente</button>
                    </div>
                </div>
                <div className="row d-flex flex-row justify-content-between my-4 px-3">
                    <div className="col-4 p-3 mx-5 bg-questions-media rounded d-flex flex-row justify-content-between">
                        <p className="fw-bold">Porcentaje de preguntas acertadas</p>
                        <p className="fw-bold">{count != 0 ? ((aciertos / count) * 100).toFixed(1) + " %" : null}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}