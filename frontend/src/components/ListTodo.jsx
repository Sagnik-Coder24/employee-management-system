import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTodo, listTodos, toggleComplete } from "../services/TodoService";
import { getLoggedInUserRole } from "../services/AuthService";

const ListTodo = () => {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAll();
    setRoles(getLoggedInUserRole());
  }, []);

  const getAll = () => {
    listTodos()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addNewTodo = () => {
    navigate("/add-todo");
  };

  const updateTodo = (id) => {
    navigate(`/edit-todo/${id}`);
  };

  const delTodo = (id) => {
    deleteTodo(id)
      .then((res) => {
        console.log(res.data);
        getAll();
      })
      .catch((err) => console.log(err));
  };

  const toogle = (id) => {
    toggleComplete(id)
      .then((res) => {
        getAll();
      })
      .catch((err) => console.log(err));
  };

  const isAdmin = () => roles.includes("ADMIN");

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">List of TODOs</h2>
      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Too Title</th>
              <th>Todo Description</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className={item.completed ? "text-secondary" : ""}>
                  {item.title}
                </td>
                <td className={item.completed ? "text-secondary" : ""}>
                  {item.description}
                </td>
                {item.completed ? (
                  <td className="text-secondary">YES</td>
                ) : (
                  <td>NO</td>
                )}
                <td>
                  <button
                    className={`btn btn-success ${isAdmin() ? "w-25" : "w-75"}`}
                    onClick={() => toogle(item.id)}
                  >
                    {item.completed ? "In-Complete" : "Complete"}
                  </button>
                  {isAdmin() && (
                    <button
                      className="btn btn-info ms-4"
                      onClick={() => updateTodo(item.id)}
                    >
                      Update
                    </button>
                  )}
                  {isAdmin() && (
                    <button
                      className="btn btn-danger ms-4"
                      onClick={() => delTodo(item.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isAdmin() && (
          <button className="btn btn-primary mt-4" onClick={addNewTodo}>
            Add Todo
          </button>
        )}
      </div>
    </div>
  );
};
export default ListTodo;
