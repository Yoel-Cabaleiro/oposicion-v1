import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./navbar.css"
import easyopLogo from '../../../../img/easyopLogo.png'

// Components

export default function NavLogo() {

  return (
    <nav className="sticky-top">
      <div className="container-fluid px-0">
        <div className="d-flex align-items-center justify-content-between container w-100 p-0 ms-5 me-0" style={{ height: "7vh" }}>

          <div className="d-flex align-items-center fw-lighter ms-0">
            <Link to="/" className="text-decoration-none d-flex align-items-center">
              <img src={easyopLogo} className="card-img-top mt-3" alt="..." style={{ width: "30%" }}></img>
              <span className="fw-bold text-black">EasyOp</span>
            </Link>
          </div>

        </div>
        {/* <hr className="container bg-secondary"></hr> */}
      </div>

    </nav>
  );
}
