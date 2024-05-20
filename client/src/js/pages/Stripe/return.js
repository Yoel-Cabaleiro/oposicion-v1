import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { PaymentElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";


// componente para devolver cuando el pago se esta procesando 

// La clave publicable api
const stripePromise = loadStripe("pk_test_51P5vU4IsYGRLwhP6JdUXu3o7FzKTg9bioUvDg6KEudzzDlOMTbe5Sk0wJ6JIsu9YFhCU7c3MHqfLSEaZm4g2dkkx00h8XcipDL");


export function Return() {
//     // se crea un usestate del estado y del cliente donde irá la informacion del estado del pago y el cliente que paga
//     const [status, setStatus] = useState(null);
//     const [customerEmail, setCustomerEmail] = useState('');

//     // codigo que nos indica STRIPE que tenemos que poner
//     useEffect(() => {
//         const queryString = window.location.search;
//         const urlParams = new URLSearchParams(queryString);
//         const sessionId = urlParams.get('session_id');
//         // Hacemos un fetch del endpoint session-status para que nos pase la info del proceso de pago y el id
//         // El fetch nos da como respuesta el email y el estado del pago
//         fetch(`${process.env.BACK_URL}/api/session-status?session_id=${sessionId}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setStatus(data.status);
//                 setCustomerEmail(data.customer_email);
//             });
//     }, []);

//     if (status === "open") {
//         console.log("Redirecting to /paymentdetails");
//         return (
//             <Navigate to="/paymentdetails" />
//         )
//     }

//     // si el pago esta completo devuelve este componente
//     if (status === "complete") {
//         return (
//             <div id="success" className="container-fluid backgroundImage mt-3 pt-3 opacity-75 min-vh-100">
//                 <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
//                     <div className="d-block text-center col-md-6 col-sm-12 col-md-8 col-lg-6 pt-5 mt-5">
//                         <h6 className="mt-5">Your payment has been processed!</h6>
//                         <h6 className="">Your subscription will be charged monthly</h6>
//                         <span className="fs-1 ">Welcome to Ocean Om</span><br></br>
//                         <span className="fs-1 ">{customerEmail}</span><br></br>
//                         <span className="">You can now enjoy all our content</span>
//                     </div>

//                     <div className="mt-5 mb-5">
//                         <Link to="/login">
//                             <button type="button" className="btn btn-outline-secondary text-dark fs-5">Click here to login</button>
//                         </Link>
//                     </div>

//                     <div className="mt-4 text-center">
//                         <div>
//                             <p className="mb-2 text-light">Follow us on</p>
//                         </div>
//                         <div>
//                             <a href="https://twitter.com/oceanom" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
//                                 <i className="fab fa-twitter fa-xl m-1" style={{ color: "#9b9d85" }}></i>
//                             </a>
//                             <a href="https://www.instagram.com/oceanom" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
//                                 <i className="fab fa-instagram fa-xl m-1" style={{ color: "#9b9d85" }}></i>
//                             </a>
//                             <a href="https://www.facebook.com/ocean_om" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
//                                 <i className="fab fa-facebook fa-xl m-1" style={{ color: "#9b9d85" }}></i>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     return null;
}