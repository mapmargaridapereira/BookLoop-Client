import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import authService from "../Services/auth.service";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  // Handle Change of Inputs
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  // Handle the Submission of the Form
  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, email, password };

    authService
      .signup(requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signup-page p-4 container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card">
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://i.imgur.com/xSNV8jN.jpg"
                  alt="signup form"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={handleSignupSubmit}>
                    <div className="d-flex align-items-center mb-3 pb-1 login-title">
                      <img
                        className="h1 fw-bold mb-0"
                        style={{ width: 150 }}
                        src="https://cdn.discordapp.com/attachments/1095679245965086811/1116454551428534372/image.png"
                      />
                      <h2>Sign Up</h2>
                    </div>

                    <h5 className="fw-normal mb-3 pb-3">Create your account</h5>
                    <div className="form-outline mb-4">
                      <label className="form-label">Email:</label>
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">Password:</label>
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">Name:</label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleName}
                      />
                    </div>

                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-dark btn-lg btn-block login-button"
                        type="submit"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>

                  {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                  )}
                  <div className="signup-redirect">
                    <p className="mb-5 pb-lg-2 signup-redirect">
                      Already have an account?
                    </p>
                    <Link to={"/login"}> Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
