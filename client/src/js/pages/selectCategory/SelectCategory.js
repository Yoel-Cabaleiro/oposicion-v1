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
        actions.getUsers();
    }, []);

    useEffect(() => {
        if (store.categorias) {
            const groups = new Set(store.categorias.map(categoria => categoria.grupo));
            setUniqueGroups(groups);
        }
    }, [store.categorias]);
    
    
    
    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
        const categories = store.categorias.filter(categoria => categoria.grupo === group);
        setFilteredCategories(categories);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
        console.log('Categoría seleccionada:', category);
    };

    const handleAddCategory = () => {
        setFinalCategories([...finalCategories, selectedCategory])
        setSelectedCategory(null)
        setSelectedGroup(null)
        // console.log(finalCategories)
    }

    const handleContinuar = () => {
        actions.setCategoriasSeleccionadas(finalCategories);
        navigate("/dashboard/")
    }

<<<<<<< HEAD
    
=======
    useEffect(() => {
        actions.getCategorias();
        actions.getUsers();
        actions.getCategoriasSeleccionadas();
    }, []);

    useEffect(() => {
        if (store.categorias) {
            // Obtener grupos únicos y almacenarlos en un conjunto
            const groups = new Set(store.categorias.map(categoria => categoria.grupo));
            setUniqueGroups(groups);
        }
    }, [store.categorias]);
>>>>>>> e6761ae99102e4fc203e4229b8e9a356ae6bf5be

    if (store.categorias.length > 0) {
        return (
            <>
                <div className="container-fluid min-vh-100 overflow-hidden mt-5 mb-0">
                    <h4 className="text-center mx-5">Selecciona la categoría:</h4>
                    <div className="container-fluid d-flex flex-row align-items-center justify-content-center my-4">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle px-5 py-3" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {selectedGroup ? selectedGroup : 'Selecciona un grupo'}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {[...uniqueGroups].map((group, index) => (
                                    <button key={index} className="dropdown-item" onClick={() => handleGroupSelect(group)}>
                                        {group}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {selectedGroup && (
                        <div className="container-fluid d-flex flex-row align-items-center justify-content-center my-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle px-5 py-3 w-100" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {!filteredCategories.length > 0 ? 'No hay categorías' : selectedCategory ? selectedCategory.nombre : 'Selecciona una categoria'}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                    {filteredCategories.map((category, index) => (
                                        <button key={index} className="dropdown-item px-5 py-3" onClick={() => handleCategorySelect(category)}>
                                            {category.nombre}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedGroup && selectedCategory ? (
                        <div className="container-fluid d-flex flex-row align-items-center justify-content-center my-4">
                            <button className="btn btn-success px-5 py-3" type="button" onClick={() => handleAddCategory()}>Añadir categoria</button>
                        </div>
<<<<<<< HEAD
                    ): null}
                    <div className="container-fluid d-flex flex-column align-items-start justify-content-start my-4 col-lg-5">
=======
                    ) : null}

                    <div className="container-fluid d-flex flex-column align-items-start justify-content-start my-4 border border-dark col-lg-5 p-5 mt-5 rounded">
>>>>>>> e6761ae99102e4fc203e4229b8e9a356ae6bf5be
                        <h5>Mis categorías</h5>
                        {finalCategories ? (
                            <ul>
                                {finalCategories.map(category => (
                                    <li className="fs-5" key={category.id}>{category.nombre}</li>
                                ))}
                            </ul>
                        ) : null}
                        <div className="container d-flex justify-content-end mb-2">
                            {finalCategories.length > 0 ? (
                                <button className="btn btn-light bg-green btn-lg px-3" onClick={handleContinuar}>Continuar</button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </>
        );
    }
};
