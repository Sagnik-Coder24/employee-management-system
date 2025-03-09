import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getOneEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const Employee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      getOneEmp();
    }
  }, []);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const getOneEmp = () => {
    getOneEmployee(id)
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
      })
      .catch((err) => console.error(err));
  };

  const saveEmployee = (e) => {
    e.preventDefault();

    if (validForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            navigate("/employees");
          });
      } else {
        createEmployee(employee)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            navigate("/employees");
          });
      }
    }
  };

  const validForm = () => {
    let valid = true;
    const errCopy = { ...errors };

    if (firstName.trim()) {
      errCopy.firstName = "";
    } else {
      errCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errCopy.lastName = "";
    } else {
      errCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errCopy.email = "";
    } else {
      errCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errCopy);

    return valid;
  };

  const pageTitle = () => {
    if (id) return "Update";
    else return "Add";
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center mt-5 mb-4">{pageTitle()} Employee</h2>
          <hr className="mb-5" />
          <div className="card-body">
            <form action="">
              <div className="form-group mb-4">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${errors.firstName && "is-invalid"}`}
                  onChange={handleFirstName}
                />
                {errors.firstName && (
                  <>
                    <div className="invalid-feedback">{errors.firstName}</div>
                  </>
                )}
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${errors.lastName && "is-invalid"}`}
                  onChange={handleLastName}
                />
                {errors.lastName && (
                  <>
                    <div className="invalid-feedback">{errors.lastName}</div>
                  </>
                )}
              </div>

              <div className="form-group mb-5">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email && "is-invalid"}`}
                  onChange={handleEmail}
                />
                {errors.email && (
                  <>
                    <div className="invalid-feedback">{errors.email}</div>
                  </>
                )}
              </div>

              <button
                type="submit"
                onClick={saveEmployee}
                className="btn btn-success"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
