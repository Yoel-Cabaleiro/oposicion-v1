import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../../store/appContext";
import "../questions/questions.css"


export default function Exam() {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [state, setState] = useState({});

    const [listaPreguntas, setListaPreguntas] = useState([])
    const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState({})
    const [resultado, setResultado] = useState(null)
    const [corregido, setCorregido] = useState(false)
    const [preguntasFalladas, setPreguntasFalladas] = useState([])


    useEffect(() => {
        const randomIndexes = new Set()
        while (randomIndexes.size < 10) {
            const randomIndex = Math.floor(Math.random() * store.preguntasSeleccionadas.length)
            randomIndexes.add(randomIndex)
        }
        const finalList = Array.from(randomIndexes).map(item => store.preguntasSeleccionadas[item])
        setListaPreguntas(finalList)
    }, []);

    // Función para cuando el usuario le de a la respuesta que considere.
    const handleSelected = (e, preguntaIndex, respuestaIndex) => {
        if (respuestasSeleccionadas[preguntaIndex] !== respuestaIndex) {
            setRespuestasSeleccionadas({ ...respuestasSeleccionadas, [preguntaIndex]: respuestaIndex })
            
        } else {
            const updatedRespuestasSeleccionadas = { ...respuestasSeleccionadas }
            delete updatedRespuestasSeleccionadas[preguntaIndex]
            setRespuestasSeleccionadas(updatedRespuestasSeleccionadas)
        }
    };

    const handleClass = (item, index, indx) => {
        if (corregido) {
            const respuestaCorrectaIndex = item.Respuestas.findIndex(resp => resp.correct === true);
            if (respuestaCorrectaIndex === indx) {
                return "my-2 success";
            } else if (respuestasSeleccionadas[index] === indx) {
                return "my-2 wrong";
            }
        } else {
            if (respuestasSeleccionadas[index] === indx) {
                return "my-2 selected";
            }
        }
        return "my-2"
    };

    const [timer, setTimer] = useState(0);

    // Función para formatear el tiempo en formato hh:mm:ss
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    const evaluate = async() => {
        let count = 0
        let preguntasAcertadas = {}
        if (Object.keys(respuestasSeleccionadas).length < listaPreguntas.length) {
            alert("Completa el examen, selecciona una respuesta para cada pregunta")
        } else {
            Object.keys(respuestasSeleccionadas).map((key) => {
                if (listaPreguntas[key].Respuestas[respuestasSeleccionadas[key]].correct === true) {
                    count += 1
                    preguntasAcertadas[key] = respuestasSeleccionadas[key]
                }
            })
            let total = ((count * 100) / 50) / 10
            
            setResultado(total)
            setCorregido(true)
            const nuevasPreguntasFalladas = listaPreguntas.reduce((falladas, pregunta, index) => {
                if (!preguntasAcertadas.hasOwnProperty(index.toString())) {
                    falladas.push(pregunta.id);
                }
                return falladas;
            }, []);
            setPreguntasFalladas(nuevasPreguntasFalladas);
            const response_fallos = await actions.actualizarFallosExamen(nuevasPreguntasFalladas, store.estadisticaSeleccionada.id, store.estudiante.id)
            const estadistica_a_actualizar = store.estadisticaSeleccionada
            estadistica_a_actualizar['ultimo_examen'] = total
            estadistica_a_actualizar['examenes_totales'] += 1
            if (estadistica_a_actualizar.ultimos_5_examenes.length >= 5) {
                estadistica_a_actualizar.ultimos_5_examenes.shift()
                estadistica_a_actualizar.ultimos_5_examenes.push(total)
                const suma_notas = estadistica_a_actualizar.ultimos_5_examenes.reduce((suma, nota) => suma + nota, 0);
                estadistica_a_actualizar['media_5_examenes'] = suma_notas / 5;
            }
            else {
               estadistica_a_actualizar.ultimos_5_examenes.push(total)
               if (estadistica_a_actualizar.ultimos_5_examenes.length >= 5){
                    const suma_notas = estadistica_a_actualizar.ultimos_5_examenes.reduce((suma, nota) => suma + nota, 0);
                    estadistica_a_actualizar['media_5_examenes'] = suma_notas / 5;
               } 
            }
            const response_estadistica = await actions.actualizarEstadistica(estadistica_a_actualizar)
            return console.log(response_fallos, response_estadistica)
        }
    }

    // Hacer una función handleClick () para que cuando se le de a la opción que el usuario seleccione, ejecute el código que Yoel hizo para que SE MARQUE LA QUE ESCOGIO EN GRIS
    // Deberiamos hacer una función en handleclick PARA CUANDO FINALICE Y LE DE AL BOTON APAREZCA UN ALERT CON EL TOTAL DE PREGUNTAS ACERTADAS Y AL DARLE AL CONSULTAR VUELTA A LA VISTA CON LAS PREGUNTAS MARCADAS CORRECTAS E INCORRECTAS Y ABAJO LA NOTA FINAL.
    // eN ESTA VISTA LAS PREGUNTAS DEBERAN IR MARCADAS DEL 1 HASTA LA PREGUNTA DEL FINAAL. APARECERAN EN ORDEN RANDOM
    // HACER UN MAP DE LAS PREGUNTAS (UN NUMERO LIMITADO DEL 0, AL 100 O AL 20 X EJEMPLO) EL DIV DE LA PREGUNTA DEBERIA SER UN MAP



    return (
        <>
            <div className="container-fluid min-vh-100 overflow-hidden mt-3 mb-0 mx-auto">
                <h2 className="m-5 px-4" >EXAMEN</h2>
                <h4 className="m-5 px-4" >Hora de prácticar en modo examen. <br></br> El resultado podrás verlo al finalizar el exámen. Mucha suerte!</h4>
                <hr className="m-5"></hr>
                {listaPreguntas && (
                    <div>
                        {listaPreguntas.map((item, index) => {
                            return (
                                <div className="container text-start mx-4 px-5 fs-6 text-justify fw-bold my-5 py-2">
                                    <p className="mb-5">{index + 1}. {Object.values(item)[0]} </p>
                                    <ul className="pb-5">
                                        {item.Respuestas.map((resp, indx) => {
                                            return (
                                                <li style={corregido ? { pointerEvents: 'none' } : {}} key={indx} onClick={(e) => handleSelected(e, index, indx)} className={handleClass(item, index, indx)} ><b>{Object.keys(resp)[0]}:</b> {Object.values(resp)[0]}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                        <hr className="m-5"></hr>
                    </div>
                )}
            </div>
            <footer className="d-flex d-flex align-items-center bg-light justify-content-center fixed-bottom" style={{ height: "15vh" }}>
                <div className="container-fluid row">
                    <div className="col-4">
                        <div className="bg-questions-media px-3 py-3 rounded d-flex flex-row align-items-between fw-bold">
                            <p className="mx-auto">Contestadas</p>
                            <p className="mx-auto">{Object.keys(respuestasSeleccionadas).length} / 50</p>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="bg-questions-media px-3 py-3 rounded d-flex flex-row align-items-between fw-bold mx-auto">
                            <p className="mx-auto">Tiempo transcurrido</p>
                            <p className="mx-auto">{formatTime(timer)}</p>
                        </div>
                    </div>
                    <div className="col-4 bg-questions-media rounded">
                        <button className="btn px-4 py-3 rounded d-flex flex-row fw-bold text-center w-100" disabled={corregido} onClick={evaluate}>
                            <p className="mx-auto text-black" >{corregido ? 'Nota final: ' + resultado + ' / 10' : 'Finalizar examen'}</p>
                        </button>
                    </div>
                </div>
                {/* <span className="p-4 fw-light text-black">© BIGWEB.club  - Web design, Web Development, Web Marketing. Milano, Madrid, London.</span> */}
            </footer>
        </>
    )

}