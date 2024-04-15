import React, { useContext, useEffect, useState } from "react";
import './home.css'
import { Link, useNavigate } from "react-router-dom";
export default function Home() {

  const navigate = useNavigate()

  const handleEmpiezaAhora = () => {
    navigate("/dashboard/")
  }


  return (
    <>
      <main className="d-flex align-items-center prueba min-vh-100" style={{ minHeight: '100vh' }}>
        <div className="container-fluid">
          <div className="d-flex flex-column">
            <img className="card-img-top mx-auto d-block align-self-center w-25" src="https://res.cloudinary.com/dx23woi99/image/upload/v1712171346/EOlogo_rortoa.png"></img>
            <h1 className="text-black text-center" style={{ fontSize: "5rem" }}>EasyOp</h1>
            <h5 className="text-black text-center">Prepara tus oposiciones, fácilmente.<br /></h5>
            <Link to="/dashboard/" className="mx-auto">
              <button className=" px-5 btn btn-primary btn-lg mt-5 text-black border border-dark fw-bold">Empieza ahora</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
