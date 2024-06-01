import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Return() {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [error, setError] = useState(null);
    const [subscription, setSubscription] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        if (sessionId) {
            fetch(`${process.env.BACK_URL}/api/session-status?session_id=${sessionId}`)
                .then((res) => {
                    if (!res.ok) {
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
                        setSubscription(data.subscription);
                    }
                })
                .catch((error) => {
                    setError(error.message);
                });
        } else {
            setError('Session ID is missing');
        }
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (status === "open") {
        return <Navigate to="/paymentdetails" />;
    }

    if (status === "complete") {
        return (
            <div id="success" className="container pt-3 min-vh-100 d-flex justify-content-center align-items-center">
                <div className='d-flex flex-column justify-content-center align-items-center bg-black text-white p-4 rounded rounded-3 opacity-75'>
                    <div className="text-center pt-5">
                        <i className="fa fa-check-circle fa-6x m-1 text-success"></i>
                        <h5 className="mt-5 lato-regular">¡Pago recibido con éxito!</h5>
                        <span className="fs-1 lato-regular bolt">Bienvenido a EasyOp,</span><br></br>
                        <span className="fs-1 lato-regular">{customerEmail}</span>
                    </div>

                    <div className="mt-3 mb-5 text-center">
                        <h6 className="lato-regular mt-3">Ya puedes prácticar con nosotros con el plan</h6>
                        {/* <p>Suscripción: {subscription}</p> */}
                        <Link to="/selectCategory" className='text-decoration-none'>
                            <button type="button" className="btn btn-light btn-lg px-5 mt-4 rounded rounded-3 fuente-lato fw-light">Clica aquí para seleccionar las categorías</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return <div>Loading...</div>;
}
