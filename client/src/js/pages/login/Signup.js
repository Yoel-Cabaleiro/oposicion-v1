import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { Context } from "../../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


export default function SignupPersonalData() {

  const navigate = useNavigate()
  const { store, actions } = useContext(Context)

  const [email, setEmail] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const signup = await actions.signup(email, password)
      if (signup) {
        actions.logout()
        console.log('response: ', signup)
        navigate('/paymentplan')
      } else {
        alert('Signup faild, try with other email or password')
      }
    } catch (error) {
      console.error('signup error: ', error)
    }
  }

  const handlePassword = (e) => {
    const newPassword = e.target.value;

    setPassword(newPassword);

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError('');
    }
  }



  return (
    <>
      <section id="signup" className="" style={{ minHeight: '100vh' }}>
        <div className="container py-3 mb-0 rounded-3 mx-auto">
          <div className="text-center mb-5">
            <p className="text-black fw-bolder fs-1 lato-regular">Regístrate</p>
          </div>
          <div>
            <div className="col-md-7 col-lg-8 m-auto text-black">
              <form onSubmit={handleSubmit} className="needs-validation mb-3" noValidate="">
                <hr className="my-4" />


                <div className="col-12 mb-3">
                  <label htmlFor="email" className="form-label lato-regular">EMAIL</label>
                  <input
                    type="email"
                    className="form-control lato-regular"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email" // Gestisce l'autocompletamento per l'email
                  />
                </div>

                <div className="col-12 mb-3">
                  <label htmlFor="password" className="form-label lato-regular">CONTRASEÑA</label>
                  <div className="input-group has-validation">
                    <input
                      type={!showPassword ? "password" : "text"}
                      className="form-control"
                      id="password"
                      placeholder="*******"
                      required=""
                      value={password}
                      onChange={handlePassword}
                      autoComplete="new-password" // Gestisce l'autocompletamento per la nuova password
                    />
                    <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                      {!showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                    </span>
                  </div>
                  {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
                </div>


                <hr className="my-4" />
                <input
                  type='submit'
                  value="submit"
                  className="btn btn-dark w-100 rounded rounded-3 btn-lg mt-5 lato-regular"
                  disabled={passwordError.length != 0 || password.length === 0 || !email.includes("@") ? true : false} />

              </form>

              <div>
                <span className="mb-2 lato-regular">Ya tienes una cuenta? <Link to="/login" className="text-black lato-regular fw-bold">Inicia sesión aquí</Link></span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
