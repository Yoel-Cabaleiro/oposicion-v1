import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import './home.css'
import { Link } from "react-router-dom";
// import logoEO from '../../../../img/logoEO.png';

export default function Home() {
  const { store, actions } = useContext(Context);

  return (
    <>
      <main className="d-flex align-items-center prueba overflow-hidden" style={{ minHeight: '100vh' }}>
        <div className="container-fluid">
          <div className="d-flex flex-column justify-content-center" style={{ height: '100%' }}>
            <img className="card-img-top mx-auto d-block w-25" src="https://res.cloudinary.com/dx23woi99/image/upload/v1712171346/EOlogo_rortoa.png" alt="EasyOp logo"></img>
            <h1 className="text-black text-center" style={{ fontSize: "5rem" }}>EasyOp</h1>
            <h5 className="text-black text-center">Prepara tus oposiciones, fácilmente.<br /></h5>
            <Link to="/dashboard/" className="text-center">
              <button type="button" className="mx-auto px-5 btn btn-primary btn-lg mt-5 text-black border border-dark fw-bold">Empieza ahora</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
