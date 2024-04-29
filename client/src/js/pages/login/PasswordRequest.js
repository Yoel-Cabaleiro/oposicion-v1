import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'


export default function PasswordRecovery() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false)
    setShowSuccess(false)

    const fetchRecoveryEmail = async (email) => {

      try {
        console.log(email)
        const url = process.env.BACK_URL + "/api/recovery-email";
        const options = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        }

        const response = await fetch(url, options)

        if (response.ok) {
          setShowSuccess(true);
          const data = await response.json()
          console.log(data.message, response.status)
        }
        if (!response.ok) {
          setShowError(true)
          const data = await response.json()
          console.log(data.message, response.status)
        }

      } catch (error) {
        console.log('error', error)
      }

    }
    fetchRecoveryEmail(email)
  };




  return (
    <>
      <section id="signup" className="d-flex align-items-center w-100 overflow-hidden h-100 py-5 mt-0 mb-0">
        <div className="container py-5 px-2">

          <div className="text-center mb-5">
            <p className="text-black fw-bolder fs-1">Nueva contraseña</p>
          </div>

          <div className="col-md-8 m-auto text-black">
            <form onSubmit={handleSubmit} className="needs-validation mb-3" noValidate="">
              <hr className="my-4" />

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />
              </div>

              {/* <hr className="my-4" /> */}
              <input type='submit' value="Resetear contraseña" className="w-100 btn btn-primary btn-lg mt-5" />
            </form>

            <div>
              <span className="d-block">¿No tienes una cuenta? <Link to="/signup" className="text-black">Regístrate aquí</Link></span>
            </div>

            {/* Alert message */}
            <div>
              {showSuccess ?
                <div className="bg-success rounded p-3 mt-4 d-flex justify-content-between align-items-center w-50 " style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: '60px', zIndex: '999' }}>
                  <p className="m-0">Check your email. A recovery link has been sent</p>
                  <span className="p-2 rounded bg-light border text-black-50" style={{ cursor: "pointer" }} onClick={() => setShowSuccess(false)}><FontAwesomeIcon icon={faClose} /></span>
                </div>
                : null
              }
              {showError ?
                <div className="bg-danger rounded p-3 mt-4 d-flex justify-content-between align-items-center w-50 " style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: '60px', zIndex: '999' }}>
                  <p className="m-0">Error. Try later of with another email</p>
                  <span className="p-2 rounded bg-light border text-black-50" style={{ cursor: "pointer" }} onClick={() => setShowError(false)}><FontAwesomeIcon icon={faClose} /></span>
                </div>
                : null
              }

            </div>
          </div>


        </div>
      </section>

    </>
  )
}
