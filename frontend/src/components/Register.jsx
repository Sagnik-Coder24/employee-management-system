import React, { useState } from "react";
import {
  isUserLoggedIn,
  registerUserRest,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setIsAuth }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const validForm = () => {
    let valid = true;
    const errCopy = { ...errors };

    if (name.trim()) {
      errCopy.name = "";
    } else {
      errCopy.name = "Name is required";
      valid = false;
    }

    if (username.trim()) {
      errCopy.username = "";
    } else {
      errCopy.username = "Username is required";
      valid = false;
    }

    if (email.trim()) {
      errCopy.email = "";
    } else {
      errCopy.email = "Email is required";
      valid = false;
    }

    if (password.trim()) {
      errCopy.password = "";
    } else {
      errCopy.password = "Password is required";
      valid = false;
    }

    setErrors(errCopy);
    return valid;
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (validForm()) {
      const user = { name, username, email, password };
      registerUserRest(user)
        .then((res) => {
          console.log(res.data);

          const token = "Basic " + window.btoa(username + ":" + password);
          storeToken(token);
          saveLoggedInUser(username);
          setIsAuth(isUserLoggedIn());

          setErr("");
          navigate("/todos");
        })
        .catch((err) => {
          console.error(err);
          setErr(err.response.data.message);
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card col-md-8 col-lg-6 p-4 shadow-lg rounded">
          <h2 className="text-center mt-3 mb-4 text-primary">
            User Registration Form
          </h2>
          <hr className="mb-4" />
          {err && (
            <div className="d-flex justify-content-center align-items-center mb-3">
              <div className="alert alert-danger text-center" role="alert">
                {err}
              </div>
            </div>
          )}
          <div className="card-body">
            <form>
              <div className="row mb-3">
                <label className="col-md-4 col-form-label">Name:</label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    className={`form-control ${errors.name && "is-invalid"}`}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-md-4 col-form-label">Username:</label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    value={username}
                    className={`form-control ${
                      errors.username && "is-invalid"
                    }`}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-md-4 col-form-label">Email:</label>
                <div className="col-md-8">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    className={`form-control ${errors.email && "is-invalid"}`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-md-4 col-form-label">Password:</label>
                <div className="col-md-8">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={password}
                    className={`form-control ${
                      errors.password && "is-invalid"
                    }`}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  onClick={registerUser}
                  className="btn btn-primary btn-lg mt-4"
                >
                  Register
                </button>
              </div>

              <p className="mt-4">
                Already registered? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
