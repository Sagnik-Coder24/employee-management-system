import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDepartment,
  getOneDepartment,
  updateDepartment,
} from "../services/DepartmentService";

const Department = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState({
    departmentName: "",
    departmentDescription: "",
  });

  useEffect(() => {
    if (id) {
      getOneDept();
    }
  }, []);

  const getOneDept = () => {
    getOneDepartment(id)
      .then((res) => {
        setDepartmentName(res.data.departmentName);
        setDepartmentDescription(res.data.departmentDescription);
      })
      .catch((err) => console.error(err));
  };

  const saveDepartment = (e) => {
    e.preventDefault();

    if (validForm()) {
      const dept = { departmentName, departmentDescription };

      if (id) {
        updateDepartment(id, dept)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            navigate("/departments");
          });
      } else {
        createDepartment(dept)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            navigate("/departments");
          });
      }
    }
  };

  const validForm = () => {
    let valid = true;
    const errCopy = { ...errors };

    if (departmentName.trim()) {
      errCopy.departmentName = "";
    } else {
      errCopy.departmentName = "Department name is required";
      valid = false;
    }

    if (departmentDescription.trim()) {
      errCopy.departmentDescription = "";
    } else {
      errCopy.departmentDescription = "Department Description is required";
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
        <div className="card col-md-8 offset-md-2">
          <h2 className="text-center mt-5 mb-4">{pageTitle()} Department</h2>
          <hr className="mb-5" />
          <div className="card-body">
            <form action="">
              <div className="form-group mb-4">
                <label className="form-label">Department Name:</label>
                <input
                  type="text"
                  placeholder="Enter Department Name"
                  name="departmentName"
                  value={departmentName}
                  className={`form-control ${
                    errors.departmentName && "is-invalid"
                  }`}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
                {errors.departmentName && (
                  <>
                    <div className="invalid-feedback">
                      {errors.departmentName}
                    </div>
                  </>
                )}
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Department Description:</label>
                <input
                  type="text"
                  placeholder="Enter Department Description"
                  name="departmentDescription"
                  value={departmentDescription}
                  className={`form-control ${
                    errors.departmentDescriptiondepartmentDescription &&
                    "is-invalid"
                  }`}
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                />
                {errors.lastName && (
                  <>
                    <div className="invalid-feedback">
                      {errors.departmentDescription}
                    </div>
                  </>
                )}
              </div>

              <button
                type="submit"
                onClick={saveDepartment}
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

export default Department;
