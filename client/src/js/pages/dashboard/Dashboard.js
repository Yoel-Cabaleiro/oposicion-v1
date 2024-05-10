import React, { useContext, useEffect, useState, } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export default function Dashboard() {

  const { store, actions } = useContext(Context)
  const navigate = useNavigate()


  const [selectedEstadistica, setSelectedEstadistica] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [uniqueGroups, setUniqueGroups] = useState(new Set());

  // deberia hacer que las categorias que se seleccionen se queden fijas en el usuario!!!!!! para que al cargar el dashboard se queden registradas. ahora están desapareciendo


  useEffect(() => {
    if (!store.login) { navigate("/") }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await actions.getEstadísticasByEstudiante(store.estudiante.id)
        console.log("Estadísticas descargadas")
      }
      catch {
        console.log("Error al cargar las estadísticas del estudiante")
      }
    }
    fetchData()
  }, [])

  const handleCategorySelect = async (estadistica) => {
    try {
      await actions.getPreguntasByCategoria(estadistica.categoria_id)
      store.estadisticaSeleccionada = estadistica
      setSelectedEstadistica(estadistica)
      console.log("Preguntas descargadas")
    }
    catch {
      console.log("Error al descargar las preguntas")
    }
  }



  return (
    <>
      <main id="signup" className="" style={{ minHeight: '100vh' }}>
        <div className="container py-5">

          <div className="mb-5 d-flex justify-content-center flex-column">
            <h1 className="text-black fs-1 text-start lato-regular fw-bold">DASHBOARD</h1>
            <h5 className="text-start mt-3 lato-regular display-7">Aquí podrás ver toda la información sobre tus actividades en las diferentes categorias,<br></br> Consultar tu media de preguntas acertadas </h5>

            <div>
              <h3 className="text-start mt-5 lato-regular fs-6">Selecciona La Categoria:</h3>
            </div>
            <div className="dropdown align-self-start m-3 ms-0 w-100">
              <button className="btn lato-regular btn-dark border border-dark rounded-3 dropdown-toggle w-100 fs-6 py-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {selectedEstadistica ? selectedEstadistica.categoria : 'Selecciona un grupo'}
              </button>
              <div className="dropdown-menu w-100 rounded rounded-3" aria-labelledby="dropdownMenuButton">
                {store.estadisticasEstudiante.map((estadistica, index) => (
                  <button key={index} className="dropdown-item lato-regular rounded rounded-3 text-center" onClick={() => handleCategorySelect(estadistica)}>
                    {estadistica.categoria}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {selectedEstadistica ? (
            <div>
              <h5 className="lato-regular mb-4">Tus Últimas Puntuaciones:</h5>
              <div className="row">
              </div>
              <div className="">
                <div className="p-5 bg-grey w-25 rounded rounded-3 shadow text-center lato-regular" style={{ boxShadow: "0" }}>
                  <div className="fs-1 text-secondary mb-3">{selectedEstadistica.ultimo_examen}</div>
                  <h5 className="fs-6 fw-bold">ÚLTIMO EXÁMEN</h5>
                </div>
                <div className="p-5 bg-grey w-25 rounded rounded-3 shadow text-center lato-regular" style={{ boxShadow: "0" }}>
                  <div className="fs-1 text-secondary mb-3">{selectedEstadistica.media_examen}</div>
                  <h5 className="fs-6 fw-bold">MEDIA DE EXAMENES TOTAL</h5>
                </div>
                <div>
                  <h5>Media de últimos 10 exámenes</h5>
                  <div>{selectedEstadistica.media_10_examenes}</div>
                </div>
              </div>
              <div>
                <h5>Mejor racha en práctica</h5>
                <div>{selectedEstadistica.mejor_racha}</div>
              </div>
              <div>
                <h5>Porcentaje aciertos en la última práctica</h5>
                <div>{selectedEstadistica.porcentaje_aciertos}%</div>
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
          ) : null}





        </div>
      </main>

    </>
  )
}
