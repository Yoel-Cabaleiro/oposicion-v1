import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


export default function SelectCategory() {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [state, setState] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [finalCategories, setFinalCategories] = useState([])
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [uniqueGroups, setUniqueGroups] = useState(new Set());

    useEffect(() => {
        actions.getCategorias();
    }, []);

    useEffect(() => {
        if (store.categorias) {
            const groups = new Set(store.categorias.map(categoria => categoria.grupo));
            setUniqueGroups(groups);
        }
    }, [store.categorias]);

    // console.log(store.estudiante)

    // Si la suscripcion es oneCategory que el lenght sea === 1;
    // Si la suscripcion es twoCategory que deje coger dos.


    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
        const categories = store.categorias.filter(categoria => categoria.grupo === group);
        setFilteredCategories(categories);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
    };

    const handleAddCategory = () => {
        if (store.estudiante.suscripcion === "oneCategory" && finalCategories.length >= 1) {
            alert("Tu suscripción solo te permite añadir una categoría.");
            return
        } else if (store.estudiante.suscripcion === "twoCategories" && finalCategories.length >= 2) {
            alert("Has alcanzado el máximo de categorias a elegir");
            return;
        }

        if (selectedCategory && !finalCategories.includes(selectedCategory)) {
            setFinalCategories([...finalCategories, selectedCategory]);
            setSelectedCategory(null);
            setSelectedGroup(null);
        }
    }

    const handleContinuar = () => {
        actions.setCategoriasSeleccionadas(finalCategories);
        // for para crear las estadisticas
        // finalCategories.forEach(category => {
        //     console.log(store.estudiante.id, category.id)
        //     actions.newEstadistica(store.estudiante.id, category.id);
        // });
        navigate("/dashboard")
    }

    if (store.categorias.length > 0) {
        return (
            <>
                <div className="container-fluid min-vh-100 bg-gradient-white-to-gray overflow-hidden">
                    <h5 className="text-start fw-bold mx-5 lato-regular fs-3 mt-5 pt-4">Selecciona el grupo y la categoria:</h5>
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="container-fluid d-flex flex-row align-items-center justify-content-start my-3">
                                <div className="dropdown">
                                    <button className="mx-4 text-start btn btn-md py-3 mt-3 rounded-1 fuente-lato fw-light dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {selectedGroup ? selectedGroup : 'Selecciona un grupo'}
                                    </button>
                                    <div className="dropdown-menu py-3 m-0" aria-labelledby="dropdownMenuButton">
                                        {[...uniqueGroups].map((group, index) => (
                                            <button key={index} className="dropdown-item p-3 lato-regular" onClick={() => handleGroupSelect(group)}>
                                                {group}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {selectedGroup && (
                                <div className="container-fluid d-flex flex-row align-items-center justify-content-start my-2">
                                    <div className="dropend">
                                        <button className="text-start mx-4 btn btn-outline-dark btn-md px-5 py-3 mt-3 border border-dark rounded-2 fuente-lato fw-light dropdown-toggle w-100" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {!filteredCategories.length > 0 ? 'No hay categorías' : selectedCategory ? selectedCategory.nombre : 'Selecciona una categoria'}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                            {filteredCategories.map((category, index) => (
                                                <button key={index} className="dropdown-item px-5 py-3 lato-regular" onClick={() => handleCategorySelect(category)}>
                                                    {category.nombre}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {selectedGroup && selectedCategory ? (
                                <div className="container-fluid d-flex flex-row align-items-center justify-content-start mx-4 my-5">
                                    <button className="btn btn-md btn-dark px-5 rounded rounded-2 py-3 lato-regular fw-bold" type="button" onClick={() => handleAddCategory()}>Añadir categoria</button>
                                </div>
                            ) : null}
                        </div>

                        <div className="col-12 col-lg-6 px-5 min-vh-100">
                            <div className="container-fluid d-flex h-50 flex-column align-items-start justify-content-start my-4 border border-dark p-5 mt-5 rounded-3 bg-black">
                                <div>
                                    <h5 className="text-white ">
                                        Tus <span className="fw-bold">CATEGORIAS</span> :
                                    </h5>
                                </div>
                                {finalCategories ? (
                                    <ul>
                                        {finalCategories.map(category => (
                                            <li className="fs-5 text-white lato-regular" key={category.id}>{category.nombre}</li>
                                        ))}
                                    </ul>
                                ) : null}
                                <div className="container d-flex justify-content-start my-4">
                                    {finalCategories.length > 0 ? (
                                        <button className="btn btn-light bg-green btn-lg px-5 rounded rounded-2 w-75 lato-regular" onClick={handleContinuar}>Continuar</button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};
