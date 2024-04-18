import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../../store/appContext";
import "../questions/questions.css"


export default function Exam() {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [state, setState] = useState({});

    // const [listaPreguntas, setListaPreguntas] = useState([])
    // const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState({})
    // const [resultado, setResultado] = useState("?")
    // const [corregido, setCorregido] = useState(false)


    console.log(store.preguntasSeleccionadas)
    useEffect(() => {
        // Generar una lista random de preguntas al cargar la pag.
        // const randomIndexes = new Set()
        // while (randomIndexes.size < 50) {
        //     const randomIndex = Math.floor(Math.random() * store.preguntasSeleccionadas.length)
        //     randomIndexes.add(randomIndex)
        // }
        // const finalList = Array.from(randomIndexes).map(item => store.preguntasSeleccionadas[item])
        // setListaPreguntas(finalList)
    }, []);

    // Función para cuando el usuario le de a la respuesta que considere.
    // const handleSelected = (e, preguntaIndex, respuestaIndex) => {
    //     if (respuestasSeleccionadas[preguntaIndex] !== respuestaIndex) {
    //         setRespuestasSeleccionadas({ ...respuestasSeleccionadas, [preguntaIndex]: respuestaIndex })
    //     } else {
    //         const updatedRespuestasSeleccionadas = { ...respuestasSeleccionadas }
    //         delete updatedRespuestasSeleccionadas[preguntaIndex]
    //         setRespuestasSeleccionadas(updatedRespuestasSeleccionadas)
    //     }
    // };

    // const handleClass = (item, index, indx) => {
    //     if (corregido) {
    //         const respuestaCorrectaIndex = item.Respuestas.findIndex(resp => resp.correct === true);
    //         if (respuestaCorrectaIndex === indx) {
    //             return "my-2 success";
    //         } else if (respuestasSeleccionadas[index] === indx) {
    //             store.preguntasFalladas.push(Object.keys(item)[0])
    //             return "my-2 wrong";
    //         }
    //         console.log(store.preguntasFalladas)
    //         localStorage.setItem("fallos", JSON.stringify(store.preguntasFalladas))
    //     } else {
    //         if (respuestasSeleccionadas[index] === indx) {
    //             return "my-2 selected";
    //         }
    //     }

    //     return "my-2"
    // };

    // const evaluate = () => {
    //     let count = 0
    //     let preguntasAcertadas = {}
    //     if (Object.keys(respuestasSeleccionadas).length < listaPreguntas.length) {
    //         alert("Completa el examen, selecciona una respuesta para cada pregunta")

    //     } else {
    //         Object.keys(respuestasSeleccionadas).map((key) => {
    //             if (listaPreguntas[key].Respuestas[respuestasSeleccionadas[key]].correct === true) {
    //                 count += 1
    //                 preguntasAcertadas[listaPreguntas[key]] = respuestasSeleccionadas[key]
    //             }
    //         })
    //         let total = ((count * 100) / 50) / 10
    //         setResultado(total)
    //         setCorregido(true)
    //     }
    // }

    // Hacer una función handleClick () para que cuando se le de a la opción que el usuario seleccione, ejecute el código que Yoel hizo para que SE MARQUE LA QUE ESCOGIO EN GRIS
    // Deberiamos hacer una función en handleclick PARA CUANDO FINALICE Y LE DE AL BOTON APAREZCA UN ALERT CON EL TOTAL DE PREGUNTAS ACERTADAS Y AL DARLE AL CONSULTAR VUELTA A LA VISTA CON LAS PREGUNTAS MARCADAS CORRECTAS E INCORRECTAS Y ABAJO LA NOTA FINAL.
    // eN ESTA VISTA LAS PREGUNTAS DEBERAN IR MARCADAS DEL 1 HASTA LA PREGUNTA DEL FINAAL. APARECERAN EN ORDEN RANDOM
    // HACER UN MAP DE LAS PREGUNTAS (UN NUMERO LIMITADO DEL 0, AL 100 O AL 20 X EJEMPLO) EL DIV DE LA PREGUNTA DEBERIA SER UN MAP



    return (
        <div className="container-fluid min-vh-100 overflow-hidden mt-3 mb-0 mx-auto">
            <h2 className="m-5 px-4" >EXAMEN</h2>
            <h4 className="m-5 px-4" >Hora de prácticar en modo examen. <br></br> El resultado podrás verlo al finalizar el exámen. Mucha suerte!</h4>
            <hr className="m-5"></hr>
            <div className="container text-start mx-4 px-5 fs-6 text-justify fw-bold my-5 py-2">
                <p className="mb-5">1. Este parrafo deberia mostrar una pregunta random seleccionada en la categoria que hemos clicado en el dropdown de arriba. Me gustaria que las preguntas se vieran en el centro con con un texto bonito y con el texto justificado ya que lo veran muchas personas y tiene que verse bien bonito. Pruebo escribiendo porque no hay internet y no puedo coger el Lorem Ipsum: </p>
                <div className="text-center">
                    <p className="mb-3">A) Aquí debera ir la respuesta de la pregunta random en el indice 0</p>
                    <p className="mb-3">B) Aquí debera ir la respuesta de la pregunta random en el indice 1</p>
                    <p className="mb-3">C) Aquí debera ir la respuesta de la pregunta random en el indice 2</p>
                    <p className="">D) Aquí debera ir la respuesta de la pregunta random en el indice 3</p>
                </div>
            </div>
            <hr className="m-5"></hr>

            <div className="container text-start mx-4 px-5 fs-6 text-justify fw-bold my-5 py-5">
                <p className="mb-5">1. Este parrafo deberia mostrar una pregunta random seleccionada en la categoria que hemos clicado en el dropdown de arriba. Me gustaria que las preguntas se vieran en el centro con con un texto bonito y con el texto justificado ya que lo veran muchas personas y tiene que verse bien bonito. Pruebo escribiendo porque no hay internet y no puedo coger el Lorem Ipsum: </p>
                <div className="text-center">
                    <p className="mb-3">A) Aquí debera ir la respuesta de la pregunta random en el indice 0</p>
                    <p className="mb-3">B) Aquí debera ir la respuesta de la pregunta random en el indice 1</p>
                    <p className="mb-3">C) Aquí debera ir la respuesta de la pregunta random en el indice 2</p>
                    <p className="">D) Aquí debera ir la respuesta de la pregunta random en el indice 3</p>
                </div>
            </div>
            <hr className="m-5"></hr>
        </div>
    )

}