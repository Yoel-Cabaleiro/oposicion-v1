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
        <div className="row align-items-center justify-content-between p-3" style={{ width: "20%" }}>
          <div className="col-6 col-md-3">
            <Link to="/" className="text-decoration-none d-flex align-items-center">
              <img src={easyopLogo} className="card-img-top mt-3 ms-md-5 ms-sm-5" alt="..." style={{ width: "20%" }} />
              <span className="fw-bold text-black fs-6">EasyOp</span>
            </Link>
          </div>
          <div className="col-md-6 d-none d-md-block">
            {/* Empty div for center alignment */}
          </div>

        </div>
      </div>

    </nav>
  );
}
