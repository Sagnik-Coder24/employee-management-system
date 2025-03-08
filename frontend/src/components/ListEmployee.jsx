import React, { useEffect, useState } from "react";
import { listEmployees } from "../services/EmployeeService";

const ListEmployee = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    listEmployees
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">List of Employees</h2>
      <hr className="mb-5" />
      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Employee Id</th>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email Id</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployee;
