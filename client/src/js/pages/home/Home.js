import React, { useContext, useEffect, useState } from "react";
import './home.css'
import { Link } from "react-router-dom";
export default function Home() {

  return (
    <>
      <main className="d-flex align-items-center prueba min-vh-100" style={{ minHeight: '100vh' }}>
        <div className="container-fluid">
          <div className="d-flex flex-column">
            <img className="card-img-top mx-auto d-block align-self-center w-25" src="https://res.cloudinary.com/dx23woi99/image/upload/v1712171346/EOlogo_rortoa.png"></img>
            <h1 className="text-black text-center" style={{ fontSize: "5rem" }}>EasyOp</h1>
            <h5 className="text-black text-center">Prepara tus oposiciones, fácilmente.<br /></h5>
            <Link to="/dashboard/">
              <button className="mx-auto px-5 btn btn-primary btn-lg mt-5 text-black border border-dark fw-bold">Empieza ahora</button>
            </Link>
          </div>
          <section className="row text-white py-3 px-2 mb-4">

            {/* <div className="col-sm-4">
              <h4 className=" fw-normal text-primary">Frontend</h4>
              <ul>
                <li>Node</li>
                <li>React</li>
                <li>Bootstraps</li>
                <li>Font Awesome</li>
                <li>Webpack</li>
              </ul>
            </div>

            <div className="col-sm-4">
              <h4 className=" fw-normal text-primary">Backend</h4>
              <ul>
                <li>Python</li>
                <li>Flask</li>
                <li>SQLAlchemy</li>
                <li>Flux - server</li>
                <li>React Router</li>
                <li>JWT - auth manager</li>
                <li>SQLight DB</li>
                <li>Bcrypt - psw hashing</li>
                <li>Smtplib - email sender</li>
              </ul>
            </div>

            <div className="col-sm-4">
              <h4 className=" fw-normal text-primary">Functionality</h4>
              <ul>
                <li>Signup</li>
                <li>Login/Logout</li>
                <li>Dashboard</li>
                <li>PSW encription</li>
                <li>Password recovery</li>
              </ul>
            </div> */}

          </section>

        </div>
      </main>
    </>
  )
}
