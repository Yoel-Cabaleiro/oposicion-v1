// archivo para poner el formulario de la tarjeta el usuario 
import React, { useState, useEffect, useContext } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import { Context } from "../../store/appContext";
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
    useNavigate
} from "react-router-dom";



// La clave publicable api
// const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)
const stripePromise = loadStripe("pk_test_51P5vU4IsYGRLwhP6JdUXu3o7FzKTg9bioUvDg6KEudzzDlOMTbe5Sk0wJ6JIsu9YFhCU7c3MHqfLSEaZm4g2dkkx00h8XcipDL");


const CheckoutForm = () => {
    const { store, actions } = useContext(Context);

    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();

    // Al cargar la pagina se inicia el fetch 
    useEffect(() => {
        const paymentInfo = JSON.parse(localStorage.getItem("payment"));
        actions.selectPaymentOption
        // Verifica si la información es válida
        if (paymentInfo && paymentInfo.clientSecret) {
            setClientSecret(paymentInfo.clientSecret);
        } else {
            navigate("/paymentdetails");
        }

        // return {
        //     // Código de limpieza (si es necesario)
        // };
    }, []);


    return (
        <div id="checkout" className="mt-5 pt-5">
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    )
};

export default CheckoutForm;