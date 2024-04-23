import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../../store/appContext";
import "../components/navigation/footer.css"

export default function FooterExam() {

  const navigate = useNavigate()
  const { store, actions } = useContext(Context)
  const [state, setState] = useState({});

  const [timer, setTimer] = useState(0);

  // Función para formatear el tiempo en formato hh:mm:ss
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  const handleFinish = () => {
    // Aquí deberia aparecer el alert con el resultado de la nota
    // e.preventDefault()
    alert(
      <div className="container rounded bg-secondary text-center d-flex flex-column p-5">
        <h4>EXAMEN ACABADO!</h4>
        <p>Las preguntas acertadas han sido:</p>
        <p className="fs-3 fw-bold">95/100</p>
        <div>
          <button className="btn btn-secondary">
            <p>Ver resumen de preguntas</p>
          </button>
        </div>
      </div>
    )
  }



  return (
    <footer className="d-flex d-flex align-items-center bg-light justify-content-center fixed-bottom" style={{ height: "15vh" }}>
      <div className="container-fluid row">
        <div className="col-4">
          <div className="bg-questions-media px-3 py-3 rounded d-flex flex-row align-items-between fw-bold">
            <p className="mx-auto">Contestadas</p>
            <p className="mx-auto">4</p>
          </div>
        </div>
        <div className="col-4">
          <div className="bg-questions-media px-3 py-3 rounded d-flex flex-row align-items-between fw-bold mx-auto">
            <p className="mx-auto">Tiempo transcurrido</p>
            <p className="mx-auto">{formatTime(timer)}</p>
          </div>
        </div>
        <div className="col-4 bg-questions-media rounded">
          <button className="btn px-4 py-3 rounded d-flex flex-row fw-bold text-center w-100" onClick={handleFinish}>
            <p className="mx-auto text-black" >Finalizar examen</p>
          </button>
        </div>
      </div>
      {/* <span className="p-4 fw-light text-black">© BIGWEB.club  - Web design, Web Development, Web Marketing. Milano, Madrid, London.</span> */}
    </footer>
  )
}


