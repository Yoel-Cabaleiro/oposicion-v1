import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


export default function SelectCategory() {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [state, setState] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        actions.getCategorias();
        actions.getUsers();
    }, []);

    console.log(store.user.email)

    // probando
    const handleCategorySelect = (category) => {
        if (store.user.subscription == "Básico") {
            setSelectedCategories(category)

        } else if (store.user.subsctiption === "Premium") {
            if (selectedCategories.includes(category)) {
                // Si la categoría ya está seleccionada, la deseleccionamos
                setSelectedCategories(selectedCategories.filter(cat => cat !== category));
            } else {
                // Si la categoría no está seleccionada, la agregamos a la lista de selecciones
                setSelectedCategories([...selectedCategories, category]);
            }
        }
    }

    return (
        <div className="container-fluid min-vh-100 overflow-hidden mt-5 mb-0">
            <h4 className="text-center mx-5">Selecciona la categoria:</h4>
            <div className="container-fluid d-flex flex-row alig-items-center justify-content-center my-4">
                <ul className="d-flex flex-nowrap flex-column gap-2 px-0 mx-2 col-md-6">
                    {store.categorias.map(item => (
                        <div className=" px-5 w-auto my-2 bg-green rounded-2 py-4 mt-4 text-center"
                            key={item.id}
                            onClick={() => handleCategorySelect(item)}>
                            <p className="fw-bold">{item.nombre}</p>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};
