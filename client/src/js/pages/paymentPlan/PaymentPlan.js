import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


export default function PaymentPlan() {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [state, setState] = useState({});

    console.log("hola")
    useEffect(() => {
    }, []);

    return (
        <div className="container-fluid min-vh-100 overflow-hidden mt-5 mb-0">
            <h4 className="text-start mx-5">Selecciona el plan que mejor se adapte a tus necesidades:</h4>
            <div className="row d-flex align-items-center justify-content-center my-auto mt-5">
                <div className="text-center col-md-4 p-5">
                    <h3>Plan Prueba</h3>
                    <div className="bg-green rounded py-5 mt-5 text-center">
                        <h4 className="fs-1">GRATIS</h4>
                        <h6 className="p-2 lh-sm text-justify">Número limitado de preguntas gratuitas para que pruebes nuestra plataforma.</h6>
                        <h6 className="p-2 lh-sm text-justify ">Después, necesitarás suscribirte a uno de nuestros planes de pago.</h6>
                    </div>
                    <Link to="/selectcategory/">
                        <button type="button" className="w-100 btn btn-outline-dark border border-dark btn-lg mt-5">Selecciona</button>
                    </Link>
                </div>
                <div className="text-center col-md-4 p-5">
                    <h3>Plan Básico</h3>
                    <div className="bg-green rounded py-5 mt-5 text-center">
                        <h4 className="fs-1">10 €</h4>
                        <h6 className="p-2 lh-sm text-justify">Acceso al contenido de una categoría de oposición.</h6>
                        <h6 className="p-2 lh-sm text-justify ">Práctica y preparación específica en dos modos: Exámen y preguntas sueltas.</h6>

                    </div>
                    <button type="button" className="w-100 btn btn-outline-dark border border-dark btn-lg mt-5">Selecciona</button>
                </div>
                <div className="text-center col-md-4 p-5">
                    <h3>Plan Premium</h3>
                    <div className="bg-green rounded py-5 mt-5 text-center">
                        <h4 className="fs-1">20 €</h4>
                        <h6 className="p-2 lh-sm text-justify">Acceso ilimitado a todas las categorías de oposición.</h6>
                        <h6 className="p-2 lh-sm text-justify ">Ideal si estás considerando presentarte a exámenes de múltiples categorías.</h6>
                    </div>
                    <button type="button" className="w-100 btn btn-outline-dark border border-dark btn-lg mt-5">Selecciona</button>
                </div>
            </div>
        </div>
    );
};
