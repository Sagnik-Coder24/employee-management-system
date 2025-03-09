import React, { useEffect, useState } from "react";
import {
  deleteDepartment,
  listDepartments,
} from "../services/DepartmentService";
import { useNavigate } from "react-router-dom";

const ListDepartment = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    listDepartments()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addNewDept = () => {
    navigate("/add-department");
  };

  const updateDepartment = (id) => {
    navigate(`/edit-department/${id}`);
  };

  const deleteDept = (id) => {
    deleteDepartment(id)
      .then((res) => {
        console.log(res.data);
        getAll();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-2">List of Departments</h2>
      <button className="btn btn-primary mb-2" onClick={addNewDept}>
        Add Department
      </button>
      <hr className="mb-5" />
      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Department Id</th>
              <th>Department Name</th>
              <th>Department Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.departmentName}</td>
                <td>{item.departmentDescription}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateDepartment(item.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger ms-4"
                    onClick={() => deleteDept(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListDepartment;
