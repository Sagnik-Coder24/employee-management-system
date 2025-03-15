import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRest, storeToken } from "../services/AuthService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validForm = () => {
    let valid = true;
    const errCopy = { ...errors };

    if (username.trim()) {
      errCopy.username = "";
    } else {
      errCopy.username = "Username is required";
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (validForm()) {
      const user = { usernameOrEmail: username, password };
      loginRest(user)
        .then((res) => {
          console.log(res.data);

          const token = "Basic " + window.btoa(username + ":" + password);
          console.log(token);
          storeToken(token);

          setErr("");
          navigate("/employees");
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
          <h2 className="text-center mt-3 mb-4 text-primary">Login Form</h2>
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
                <label className="col-md-4 col-form-label">
                  Username or Email:
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter your username or email"
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
                <label className="col-md-4 col-form-label">Password:</label>
                <div className="col-md-8">
                  <input
                    type="text"
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
                  onClick={handleLogin}
                  className="btn btn-primary btn-lg mt-4"
                >
                  Login
                </button>
              </div>

              <p className="mt-4">
                Not registered? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
