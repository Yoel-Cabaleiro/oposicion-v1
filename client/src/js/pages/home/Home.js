import React, { useContext, useEffect, useState } from "react";
import './home.css'
import { Link, useNavigate } from "react-router-dom";
export default function Home() {

  const navigate = useNavigate()

  // const handleEmpiezaAhora = () => {
  //   navigate("/dashboard/")
  // }

  return (
    <>
      <main className="d-flex align-items-center w-100 overflow-hidden h-100 py-5 mt-5 mb-0">
        <div className="container-fluid h-100">
          <div className="row d-flex flex-column mx-5 justify-content-start align-items-center">
            <div className="col-md-12 text-start">
              <h1 className="text-black texto-grande-1 fw-normal fw-lg-bold" style={{ fontSize: "5.5vw" }}>Prepara tus oposiciones<br />
                de manera práctica y fácil.</h1>
            </div>
            <h5 className="text-black text-start fw-light mt-4 fs-5">Modo examen, preguntas test y múltiples categorías.</h5>
            <h5 className="text-black text-start fw-light">Información actualizada diariamente sobre tus actividades.</h5>
            <Link to="/signup/" className="">
              <button className=" px-5 btn btn-dark btn-lg mt-5 text-white border border-dark rounded-3 fw-light">Empieza ahora</button>
            </Link>
          </div>
        </div>
      </main >
    </>
  )
}
