import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <>
      <main className="d-flex align-items-center w-100 overflow-hidden h-100 my-0 min-vh-100">
        <div className="container-fluid h-100">
          <div className="row d-flex flex-column mx-5 justify-content-start align-items-center">
            <div className="col-md-12 text-start">
              <h1 className="text-black lato-regular display-4 display-md-1" style={{ fontSize: "5.5vw" }}>Prepara Tus Oposiciones<br />
                De Manera Práctica y Fácil.</h1>
            </div>
            <h5 className="text-black text-start fuente-lato fw-light mt-4 fs-4">Modo examen, preguntas test y múltiples categorías.</h5>
            <h5 className="text-black text-start fuente-lato fw-light fs-4">Información actualizada diariamente sobre tus actividades.</h5>
            <Link to="/signup/" className="">
              <button className="btn btn-dark btn-lg px-5 mt-5 text-white border border-dark rounded-3 fuente-lato fw-light">Empieza ahora</button>
            </Link>
          </div>
        </div>
      </main >
    </>
  );
}
