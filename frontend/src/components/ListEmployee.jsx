import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployee = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    listEmployees()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addNewEmp = () => {
    navigate("/add-employee");
  };

  const updateEmployee = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const deleteEmp = (id) => {
    deleteEmployee(id)
      .then((res) => {
        console.log(res.data);
        getAll();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-2">List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmp}>
        Add Employee
      </button>
      <hr className="mb-5" />
      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Employee Id</th>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateEmployee(item.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger ms-4"
                    onClick={() => deleteEmp(item.id)}
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

export default ListEmployee;
