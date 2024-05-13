import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [selectedEstadistica, setSelectedEstadistica] = useState(null);

  useEffect(() => {
    if (!store.login) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {

        if (store.estadisticasEstudiante.length === 0) {
          await actions.getEstadísticasByEstudiante(store.estudiante.id)
        }
        if (Object.keys(store.estadisticaSeleccionada).length != 0) {
          setSelectedEstadistica(store.estadisticaSeleccionada)

        }
      } catch {
        console.log("Error al cargar las estadísticas del estudiante");
      }
    };
    fetchData();
  }, []);

  const handleCategorySelect = async (estadistica) => {
    try {
      await actions.getPreguntasByCategoria(estadistica.categoria_id);
      store.estadisticaSeleccionada = estadistica;
      setSelectedEstadistica(estadistica);
    } catch {
      console.log("Error al descargar las preguntas");
    }
  };

  return (
    <>
      <main id="signup" className="" style={{ minHeight: "100vh" }}>
        <div className="container py-5">
          <div className="mb-1 d-flex justify-content-center flex-column">
            <h1 className="text-black fs-1 text-start lato-regular fw-bold">
              DASHBOARD
            </h1>
            <h5 className="text-start mt-3 lato-regular display-7">
              Aquí podrás ver toda la información sobre tus actividades en las
              diferentes categorias, Consultar tu media de preguntas acertadas{" "}
            </h5>

            <div>
              <h3 className="text-start mt-5 lato-regular fs-6">
                Selecciona La Categoria:
              </h3>
            </div>
            <div className="dropdown align-self-start m-3 ms-0 w-100">
              <button
                className="btn lato-regular btn-dark border border-dark rounded-3 dropdown-toggle w-100 fs-6 py-2"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {selectedEstadistica
                  ? selectedEstadistica.categoria
                  : "Selecciona un grupo"}
              </button>
              <div
                className="dropdown-menu w-100 rounded rounded-3"
                aria-labelledby="dropdownMenuButton"
              >
                {store.estadisticasEstudiante.map((estadistica, index) => (
                  <button
                    key={index}
                    className="dropdown-item lato-regular rounded rounded-3 text-center"
                    onClick={() => handleCategorySelect(estadistica)}
                  >
                    {estadistica.categoria}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {selectedEstadistica ? (
            <div>
              <h5 className="lato-regular mb-5">Tus Últimas Puntuaciones:</h5>
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                  <div className="p-5 bg-grey rounded rounded-2 shadow text-center lato-regular">
                    <div className="fs-1 text-secondary mb-3">
                      {selectedEstadistica.examenes_totales}
                    </div>
                    <h5 className="fs-6 fw-bold">
                      EXÁMENES REALIZADOS
                    </h5>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                  <div className="p-5 bg-grey rounded rounded-2 shadow text-center lato-regular">
                    <div className="fs-1 text-secondary mb-3">
                      {selectedEstadistica.ultimo_examen}
                    </div>
                    <h5 className="fs-6 fw-bold">ÚLTIMO EXÁMEN</h5>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                  <div className="p-5 bg-grey rounded rounded-2 shadow text-center lato-regular">
                    <div className="fs-1 text-secondary mb-3">
                      {selectedEstadistica.media_5_examenes ? selectedEstadistica.media_5_examenes.toFixed(1) : null}
                    </div>
                    <h5 className="fs-6 fw-bold">
                      MEDIA DE ÚLTIMOS 5 EXÁMENES
                    </h5>
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                  <div className="p-5 bg-grey rounded rounded-2 shadow text-center lato-regular">
                    <div className="fs-1 text-secondary mb-3">
                      {selectedEstadistica.mejor_racha}
                    </div>
                    <h5 className="fs-6 fw-bold">MEJOR RACHA EN PRÁCTICA</h5>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="p-5 pt-5 pb-4 bg-grey rounded rounded-2 shadow text-center lato-regular">
                    <div className="fs-1 text-secondary mb-3">
                      {selectedEstadistica.porcentaje_aciertos}%
                    </div>
                    <h5 className="fs-6 fw-bold">
                      PORCENTAJE ACIERTOS EN LA ÚLTIMA PRÁCTICA
                    </h5>
                  </div>
                </div>
              </div>

              <div className="container-fluid mx-auto">
                <div className="row justify-content-md-center align-items-center">
                  <div className="col-sm-12 col-md-6 mx-auto">
                    <Link to="/questions" className="text-decoration-none">
                      <button type="button" className="lato-regular px-5 w-100 btn btn-outline-dark btn-lg mt-5 border border-dark rounded rounded-3 d-flex justify-content-center align-items-center mb-2" style={{ cursor: 'pointer' }}>Práctica con preguntas</button>
                    </Link>
                  </div>
                  <div className="col-sm-12 col-md-6 mx-auto">
                    <Link to="/exam" className="text-decoration-none">
                      <button type="button" className="lato-regular px-5 w-100 btn btn-outline-dark btn-lg mt-5 border border-dark rounded rounded-3 d-flex justify-content-center align-items-center mb-2" style={{ cursor: 'pointer' }}>Simula un exámen</button>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          ) : null}
        </div>
      </main >
    </>
  );
}
