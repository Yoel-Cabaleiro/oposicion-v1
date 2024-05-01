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
    navigate("/")
  }

  return (
    <nav className="text-black sticky-top mt-5">
      <div className="d-flex align-items-center container" style={{ height: "7vh" }}>

        <div className="me-auto fw-lighter">
          <Link to="/" className="text-decoration-none">
            <img src={easyopLogo} className="card-img-top mt-3" alt="..." style={{ width: "30%" }}></img>
            <span className="fw-bold text-black">EasyOp</span>
          </Link>
        </div>

        <div>
          <span className="btn btn-sm btn-outline-dark rounded-3 mb-0" style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</span>
        </div>

      </div>
    </nav>
  );
}
