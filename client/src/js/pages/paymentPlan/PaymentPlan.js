import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


export default function PaymentPlan() {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [state, setState] = useState({});
    const [userSubscription, setUserSubscription] = useState("")

    // console.log("hola")
    // handleClickFreePlan = () => {
    //     setUserSubscription("Free Trial")
    //     store.user.subscription
    // }

    useEffect(() => {
        store.user
    }, []);

    return (
        <div className="container-fluid overflow-hidden mt-5 mb-0 min-vh-100">
            <h4 className="text-center mx-5 texto-grande-1 fw-normal my-5 fs-1">Selecciona la opción que mejor se adapte a tus necesidades:</h4>
            <div className="row d-flex align-items-start justify-content-center my-auto gap-5 mt-4 mb-2">
                <div className="text-center col-md-3 p-4 bg-grey">
                    <h3 className="fs-5 fw-normal">PREGUNTAS LIMITADAS</h3>
                    <div className="py-3 mt-2 text-center">
                        <h4 className="fs-2">GRATIS</h4>
                        <ul className="list-unstyled text-center fw-light">
                            <li className="p-2 lh-sm text-justify fw-light"><span className="bullet">&#8226;</span> Número limitado de preguntas gratuitas para que pruebes nuestra plataforma.</li>
                            <li className="p-2 lh-sm text-justify fw-light"><span className="bullet">&#8226;</span> Después, necesitarás suscribirte a uno de nuestros planes de pago.</li>
                        </ul>
                    </div>
                    <Link to="/selectcategory/">
                        <button type="button" className="px-5 btn btn-dark btn-lg text-white border border-dark rounded-3 fw-light">Selecciona</button>
                    </Link>
                </div>
                <div className="text-center col-md-3 p-4 bg-grey">
                    <h3 className="fs-5 fw-normal">UNA CATEGORIA</h3>
                    <div className="py-4 mt-2 text-center">
                        <h4 className="fs-2">10 €</h4>
                        <ul className="list-unstyled text-center fw-light">
                            <li className="p-2 lh-sm text-justify fw-light"><span className="bullet">&#8226;</span> Acceso al contenido de una categoría de oposición.</li>
                            <li className="p-2 lh-sm text-justify fw-light"><span className="bullet">&#8226;</span> Práctica y preparación específica en dos modos: Exámen y preguntas sueltas.</li>
                        </ul>
                    </div>
                    <button type="button" className="px-5 btn btn-dark btn-lg text-white border border-dark rounded-3 fw-light">Selecciona</button>
                </div>
                <div className="text-center col-md-3 p-4 bg-grey">
                    <h3 className="fs-5 fw-normal">DOS CATEGORIAS</h3>
                    <div className="py-4 mt-2 text-center">
                        <h4 className="fs-2">20 €</h4>
                        <ul className="list-unstyled text-center fw-light">
                            <li className="p-2 lh-sm text-justify fw-light"><span className="bullet">&#8226;</span> Acceso ilimitado a todas las categorías de oposición.</li>
                            <li className="p-2 lh-sm text-justify fw-light"><span className="bullet">&#8226;</span> Ideal si estás considerando presentarte a exámenes de múltiples categorías.</li>
                        </ul>
                    </div>
                    <button type="button" className="px-5 btn btn-dark btn-lg text-white border border-dark rounded-3 fw-light">Selecciona</button>
                </div>
            </div>
        </div >
    );
};
