import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../../store/appContext";



export default function Questions() {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [state, setState] = useState({});


    useEffect(() => {
        actions.getPreguntasByCategoria();
    }, []);

    return (
        <div className="container-fluid min-vh-100 overflow-hidden mt-5 mb-0">
            <h2 className="m-5" >PRACTICE</h2>
            <div>


            </div>
        </div>
    )

}