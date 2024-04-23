import React, { useContext, useEffect, useState, } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export default function Dashboard() {

  const { store, actions } = useContext(Context)
  const navigate = useNavigate()

  const [usersList, setUsersList] = useState([])
  const [usersName, setUsersName] = useState([])
  const [email, setEmail] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedGroup, setSelectedGroup] = useState(null);
  // const [uniqueGroups, setUniqueGroups] = useState(new Set());

  // deberia hacer que las categorias que se seleccionen se queden fijas en el usuario!!!!!! para que al cargar el dashboard se queden registradas. ahora están desapareciendo

  console.log(store.categoriasSeleccionadas)
  console.log(store.user)

  useEffect(() => {
    if (!store.login) { navigate("/") }
  }, [store.pro])

  useEffect(() => {
    const fetchData = async () => {
      const users = await actions.getUsers()
      const categorias = actions.getCategoriasSeleccionadas();
      setSelectedCategory(categorias);

      if (users.message) {
        setUsersList(users.data)
      } else {
        setUsersList(users.data)
      }
    }
    fetchData()
  }, [store.login]);

  useEffect(() => {
    actions.getCategoriasSeleccionadas();
  }, []);

  const handleChangePassword = () => {
    alert("to change your password go to http://localhost:1954/#/password-request")
  }

  return (
    <>
      <main id="signup" className="" style={{ minHeight: '100vh' }}>
        <div className="container py-5">

          <div className="mb-5 d-flex justify-content-center flex-column">
            <h1 className="text-black fw-bolder fs-1 text-center">DASHBOARD</h1>
            <div>
              <h3 className="text-center mt-5">Selecciona la categoria:</h3>
            </div>
            <div className="dropdown align-self-center m-4 w-75">
              <button className="btn btn-success dropdown-toggle px-5 py-3 w-100" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {/* {selectedGroup ? selectedGroup : 'Selecciona un grupo'} */}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {store.categoriasSeleccionadas.map((categoria, index) => (
                  <button key={index} className="dropdown-item" onClick={() => handleCategorySelect(categoria)}>
                    {categoria.nombre}
                  </button>
                ))}
              </div>
            </div>

          </div>


          <div className="d-flex">
            <div className="text-gray border rounded bg-light p-3 w-50 me-3 h-auto">
              <h4 className="mb-3 text-decoration-underline" >My data</h4>
              <p className="fw-lighter"> Email - <span className="fw-normal">{store.user.email}</span></p>
              <p className="fw-lighter"> Tu suscripcion - <span className="fw-normal">{store.user.suscripcion}</span></p>
              <div className="d-flex">
                <button className="btn-sm btn-light border" onClick={handleChangePassword}>Change psw</button>
              </div>
              <div>
                <p>User categories</p>
                {/* <p>{[store.categoriasSeleccionadas]}</p> */}
              </div>
            </div>

            <div className="text-gray border rounded bg-light p-3 w-50">
              <h4 className="mb-3 text-decoration-underline" >Users List</h4>
              {usersList.map(user => {
                return <p key={user.id} className="fw-lighter"><span className="fw-normal">{user.email}</span></p>
              })}
            </div>

            <div className="text-gray border rounded bg-light p-3 w-50">
              <h4 className="mb-3 text-decoration-underline" >Users List</h4>
              {usersList.map(user => {
                return <p key={user.id} className="fw-lighter"><span className="fw-normal">{user.email}</span></p>
              })}
            </div>
          </div>

          <div className="container-fluid mx-auto">
            <div className="row d-flex flex-row justify-content-center align-items-center mx-auto">
              <div className="col-5">
                <Link to="/questions">
                  <button className="px-5 btn btn-primary btn-lg mt-5 text-black border border-dark fw-bold d-flex justify-content-center align-items-center">
                    <p className="text-black">Práctica con preguntas</p>
                  </button>
                </Link>
              </div>
              <div className="col-5">
                <Link to="/exam">
                  <button className="px-5 btn btn-primary btn-lg mt-5 text-black border border-dark fw-bold d-flex justify-content-center align-items-center">
                    <p className="text-black">Simula un exámen</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>




        </div>
      </main>

    </>
  )
}
