import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTodo, getOneTodo, updateTodo } from "../services/TodoService";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      getOne();
    }
  }, []);

  const getOne = () => {
    getOneTodo(id)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCompleted(res.data.completed);
      })
      .catch((err) => console.error(err));
  };

  const saveTodo = (e) => {
    e.preventDefault();

    if (validForm()) {
      const todo = { title, description, completed };

      if (id) {
        updateTodo(id, todo)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            navigate("/todos");
          });
      } else {
        createTodo(todo)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            navigate("/todos");
          });
      }
    }
  };

  const validForm = () => {
    let valid = true;
    const errCopy = { ...errors };

    if (title.trim()) {
      errCopy.title = "";
    } else {
      errCopy.title = "Todo Title is required";
      valid = false;
    }

    if (description.trim()) {
      errCopy.description = "";
    } else {
      errCopy.description = "Todo Description is required";
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
          <h2 className="text-center mt-5 mb-4">{pageTitle()} Todo</h2>
          <hr className="mb-5" />
          <div className="card-body">
            <form action="">
              <div className="form-group mb-4">
                <label className="form-label">Todo Title:</label>
                <input
                  type="text"
                  placeholder="Enter Todo Title"
                  name="title"
                  value={title}
                  className={`form-control ${errors.title && "is-invalid"}`}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && (
                  <>
                    <div className="invalid-feedback">{errors.title}</div>
                  </>
                )}
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Todo Description:</label>
                <input
                  type="text"
                  placeholder="Enter Todo Description"
                  name="description"
                  value={description}
                  className={`form-control ${
                    errors.description && "is-invalid"
                  }`}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.lastName && (
                  <>
                    <div className="invalid-feedback">{errors.description}</div>
                  </>
                )}
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Todo Completed:</label>
                <select
                  className={`form-control`}
                  value={completed}
                  onChange={(e) => setCompleted(e.target.value)}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <button
                type="submit"
                onClick={saveTodo}
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

export default Todo;
