import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../../store/appContext";

export function Return() {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)

    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [error, setError] = useState(null);
    const [subscription, setSubscription] = useState('');
    const [estudianteId, setEstudianteId] = useState(store.estudiante.id)

    //  PENDIENTE //
    // subscription
    // actions.setCategoriasSeleccionadas(finalCategories);
    // Cuando le demos al boton queremos pasarle subscription para actualizar el fetch de put de estudiante y al abrir el seleccionar categorias hacer condicional si es oneCategory que el lenght sea 1 y si es el otro que sea mas grande.

    // 1. coges subscription y lo actualizas en el modelo
    // 2. en el boton handleClick llamamos al endpoint de put de estudiante y cambiamos la subscripcion

    // EJEMPLO
    // try: 
    // AWAIT ACTION ACTUALIZAR ESTUDIANTE (SUSCRIPTION)
    // subscription


    // Cuando el usuario no se completa el pago, en el formulario mismo aparece el error que tiene y no le deja continuar.

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        if (sessionId) {
            fetch(`${process.env.BACK_URL}/api/session-status?session_id=${sessionId}`)
                .then((res) => {
                    if (!res.ok) {
                        console.log(res)
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setStatus(data.status);
                        setCustomerEmail(data.customer_email);
                        // Cogemos los detalles del usuario del local storage
                        const paymentDetails = localStorage.getItem("payment");
                        // lo parseamos de json a js para poder usarlo
                        const paymentData = JSON.parse(paymentDetails);
                        console.log(paymentData.option)
                        // seteamos subscripcion con la option del localstorage ya guardada en nuestro js.
                        setSubscription(paymentData.option);

                    }
                })
                .catch((error) => {
                    setError(error.message);
                });
        } else {
            setError('Session ID is missing');
        }
    }, []);

    useEffect(() => {
        if (subscription) {
            console.log('Subscription updated:', subscription);
        }
    }, [subscription]);


    console.log(subscription)
    console.log(store.estudiante)
    console.log(store.login)

    const handleClick = async () => {
        try {
            
            console.log(store.estudiante)
            const result = await actions.updateSuscriptionEstudiante(store.estudiante.id, subscription);
            if (result.error) {
                console.log("error")
                setError(result.error);
            } else {
                console.log("Suscripción actualizada exitosamente");
                navigate("/selectCategory");
            }
        } catch (err) {
            setError(err.message);
        }
    }

    if (error) {
        return console.log(error)
    }

    if (status === "open") {
        // <div id="pending" className="container pt-3 min-vh-100 d-flex justify-content-center align-items-center">
        //     <div className='d-flex flex-column justify-content-center align-items-center bg-black text-white p-4 rounded rounded-3 opacity-75'>
        //         <div className="text-center pt-5">
        //             <i className="fa fa-circle-exclamation fa-6x m-1 text-danger"></i>
        //             <h5 className="mt-5 lato-regular">Opps!</h5>
        //             <span className="fs-1 lato-regular bolt">No se pudo completar tu pago. Por favor, revisa tus detalles de pago y vuelve a intentarlo.</span><br />
        //             <button type="button" className="btn btn-light btn-lg px-5 mt-4 rounded rounded-3 fuente-lato fw-light">Reintentar pago</button>
        //         </div>

        //         <div className="mt-3 mb-5 text-center">
        //             <h6 className="lato-regular mt-3">Ya puedes prácticar con nosotros con el plan {subscription}</h6>
        //             <Link to="/selectCategory" className='text-decoration-none'>
        //                 <button type="button" className="btn btn-light btn-lg px-5 mt-4 rounded rounded-3 fuente-lato fw-light">Clica aquí para seleccionar las categorías</button>
        //             </Link>
        //         </div>
        //     </div>
        // </div>
        return <Navigate to="/paymentdetails" />;
    }

    if (status === "complete") {
        return (
            <div id="success" className="container pt-3 min-vh-100 d-flex justify-content-center align-items-center">
                <div className='d-flex flex-column justify-content-center align-items-center bg-black text-white p-4 rounded rounded-3 opacity-75'>
                    <div className="text-center pt-5">
                        <i className="fa fa-check-circle fa-6x m-1 text-success"></i>
                        <h5 className="mt-5 lato-regular">¡Pago recibido con éxito!</h5>
                        <span className="fs-1 lato-regular bolt">Bienvenido a EasyOp,</span><br />
                        <span className="fs-1 lato-regular">{customerEmail}</span>
                    </div>

                    <div className="mt-3 mb-5 text-center">
                        <h6 className="lato-regular mt-3">Ya puedes prácticar con nosotros con el plan {subscription}</h6>
                        {/* <p>Suscripción: {subscription}</p> */}
                        <Link to="/selectCategory" className='text-decoration-none'>
                            <button type="button" className="btn btn-light btn-lg px-5 mt-4 rounded rounded-3 fuente-lato fw-light" onClick={handleClick}>Clica aquí para seleccionar las categorías</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return <div>Loading...</div>;
}
