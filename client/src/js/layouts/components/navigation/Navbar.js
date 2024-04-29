import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./navbar.css"
import easyopLogo from '../../../../img/easyopLogo.png'

export default function Navbar() {

  return (
    <nav className="sticky-top mt-5">
      <div className="d-flex align-items-center justify-content-between container w-100 p-0 ms-5 me-0" style={{ height: "7vh" }}>

        <div className="d-flex align-items-center fw-lighter ms-0">
          <Link to="/" className="text-decoration-none d-flex align-items-center">
            <img src={easyopLogo} className="card-img-top mt-3" alt="..." style={{ width: "30%" }}></img>
            <span className="fw-bold text-black">EasyOp</span>
          </Link>
        </div>


        <div>
          <Link to="/login" className="text-decoration-none">
            <button className="btn btn-lg btn-outline-dark rounded-3 border border-dark mb-0">Inicia sesión</button>
          </Link>
        </div>

      </div>
      {/* <hr className="container bg-secondary"></hr> */}
    </nav>
  );
}
