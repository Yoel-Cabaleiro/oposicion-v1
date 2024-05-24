import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons'
import { Context } from "../../../store/appContext";
import easyopLogo from "../../../../img/easyopLogo.png"
// Components

export default function NavDashboard() {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate()

  const handleLogout = () => {
    actions.logout()
    navigate("/login")
  }

  return (
    <nav className="text-black sticky-top " style={{ backgroundColor: "white" }}>
      <div className="container-fluid px-0">
        <div className="row align-items-center justify-content-between p-3">
          <div className="col-6 col-md-3">
            <Link to="/" className="text-decoration-none d-flex align-items-center">
              <img src={easyopLogo} className="card-img-top mt-3 ms-md-5 ms-sm-5" alt="..." style={{ width: "20%" }} />
              <span className="fw-bold text-black fs-6">EasyOp</span>
            </Link>
          </div>

          <div className="col-md-6 d-none d-md-block">
            {/* Empty div for center alignment */}
          </div>

          <div className="col-6 col-md-3 text-end">
            <Link to="/login" className="text-decoration-none">
              <button className="btn btn-md py-2 me-md-5 px-4 btn-outline-dark rounded-3 border border-dark mb-0 fuente-lato fw-light" style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</button>
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
}
