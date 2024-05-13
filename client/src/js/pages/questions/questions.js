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
    const [racha, setRacha] = useState(0)
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

    const resolve = async (index, item) => {
        const nuevasClases = [...clases]
        if (item.correct === true) {
            nuevasClases[index] = "success"
            setAciertos((prevState) => prevState + 1)
            setCount((prevState) => prevState + 1)
            setRacha((prevState) => prevState + 1)
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
            if (racha > store.estadisticaSeleccionada.mejor_racha) {
                const nueva_racha = store.estadisticaSeleccionada
                nueva_racha['mejor_racha'] = racha
                await actions.actualizarEstadistica(nueva_racha)
            }
            setRacha(0)
        }
        setClases(nuevasClases)
        setRespuestaSeleccionada(true)
    }


    // Hacer una función handleClick () para que cuando se le de a la opción que el usuario seleccione, ejecute el código que Yoel hizo para que aparezca la correcta y las falladas marcadas.y se sumen en caso de correcta al current streak
    // Deberiamos hacer una función en handleclick siguiente para que se vuelva a cargar la misma vista generando una nueva pregunta random y que se actualicen las medias de los div grises.
    // Deberiamos hacer una ruta dinámica en router.js para que depende de que categoria de las que ha seleccionado el usuario se haga una ruta dependiendo del id para que se cojan las preguntas del endpoint.

    return (
        <div className="container-fluid min-vh-100 overflow-hidden mt-3 mb-0 mx-auto">
            <h2 className="m-5 mb-4 px-5 mx-3 text-start lato-regular fw-bold text-black mb-5 ">PRÁCTICA</h2>

            {pregunta && (
                <div className="container text-start mx-auto px-5 fs-6 text-justify mb-5">
                    {/* {Object.keys(pregunta)[0]}.  */}
                    <div className="mb-5"><h4 className="lato-regular text-black">{Object.values(pregunta)[0]}</h4></div>
                    <ul>
                        {pregunta.Respuestas.map((item, index) => (
                            <li style={respuestaSeleccionada ? { pointerEvents: 'none' } : {}} key={index} onClick={() => resolve(index, item)} className={`my-2 ${clases[index]} lato-regular`} ><b>{Object.keys(item)[0]}: </b> {Object.values(item)[0]}</li>
                        ))}
                    </ul>
                </div>
            )}
            <hr className="m-5"></hr>
            <div className="container-fluid d-flex flew-row mx-auto row">
                <div className="col-md-8 d-flex flex-column">
                    <div className="accordion accordion-flush d-flex flex-row rounded rounded-3 w-100 justify-content-center mb-3" id="accordionFlush">
                        <div className="accordion-item ms-4 w-100">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button className="accordion-button collapsed lato-regular col-6" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">Más información sobre tu práctica</button>
                            </h2>
                            <div className="accordion-collapse collapse" id="flush-collapseOne" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlush">
                                <div className="row d-flex flex-row px-2 accordion-body justify-content-between">
                                    <div className="col-md-5 col-sm-12 p-3 mt-1 bg-questions-media rounded d-flex flex-row justify-content-between text-wrap">
                                        <p className="fw-bold">Preguntas acertadas</p>
                                        <p className="fw-bold ">{aciertos} / {count}</p>
                                    </div>
                                    <div className="col-md-6 col-sm-12 p-3 mt-1 bg-questions-media rounded d-flex flex-row justify-content-between text-wrap">
                                        <p className="fw-bold">Porcentaje preguntas acertadas</p>
                                        <p className="fw-bold">{count !== 0 ? ((aciertos / count) * 100).toFixed(1) + " %" : null}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex flex-column">
                    <div className="d-flex justify-content-center align-items-center py-2 w-100">
                        <button className="w-75 btn btn-outline-dark rounded rounded-3 fs-6 border border-dark btn-lg lato-regular" onClick={() => handleNext()}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    );
}    