import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./navbar.css"
import easyopLogo from '../../../../img/easyopLogo.png'

// Components

export default function NavLogo() {

  return (
    <nav className="bg-white text-black sticky-top shadow">
      <div className="d-flex align-items-center container" style={{ height: "55px" }}>

        <div className="me-auto fw-lighter">
          <Link to="/" className="text-decoration-none">
            <img src={easyopLogo} className="card-img-top mt-3" alt="..." style={{ width: "40%" }}></img>
          </Link>
        </div>

      </div>
    </nav>
  );
}
