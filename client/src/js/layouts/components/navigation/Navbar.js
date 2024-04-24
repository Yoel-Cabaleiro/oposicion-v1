import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./navbar.css"
import easyopLogo from '../../../../img/easyopLogo.png'

export default function Navbar() {

  return (
    <nav className="navbar-bg text-black sticky-top">
      <div className="d-flex align-items-center container" style={{ height: "7vh" }}>

        <div className="me-auto fw-lighter">
          <Link to="/" className="text-decoration-none">
            <img src={easyopLogo} className="card-img-top mt-3" alt="..." style={{ width: "40%" }}></img>
            <span className="fw-bold">EasyOp</span>
          </Link>
        </div>


        <div>
          <Link to="/login" className="text-decoration-none">
            <span className="mb-0 me-4">Login</span>
          </Link>
          <Link to="/signup/" className="text-decoration-none">
            <button className="btn btn-sm btn-primary text-dark mb-0">New Account</button>
          </Link>
        </div>


      </div>
    </nav>
  );
}
