import "./App.css";
import Department from "./components/Department";
import Employee from "./components/Employee";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ListDepartment from "./components/ListDepartment";
import ListEmployee from "./components/ListEmployee";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ListTodo from "./components/ListTodo";
import Todo from "./components/Todo";
import Register from "./components/Register";
import Login from "./components/Login";
import {
  getLoggedInUser,
  getUserName,
  isUserLoggedIn,
} from "./services/AuthService";
import { useEffect, useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(isUserLoggedIn());
  const [nameOfUser, setNameOfUser] = useState("");

  const capitalize = (str) => {
    if (typeof str !== "string") {
      return str; // If the input is not a string, return it as is
    }

    if (!str) return str; // Return empty string if input is empty

    const firstChar = str.charAt(0);
    if (/[a-zA-Z]/.test(firstChar)) {
      return firstChar.toUpperCase() + str.slice(1);
    } else {
      return str; // If the first character is not a letter, return the string as is
    }
  };

  useEffect(() => {
    if (isAuth) {
      displayUserName();
    } else {
      setNameOfUser("");
    }
  }, [isAuth]);

  const displayUserName = async () => {
    const username = getLoggedInUser();
    const name = await getUserName(username);
    setNameOfUser(" | User: " + capitalize(name) + " | ");
  };

  return (
    <Router>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} nameOfUser={nameOfUser} />

      {!isAuth && (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/register"
            element={<Register setIsAuth={setIsAuth} />}
          />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}

      {isAuth && (
        <Routes>
          <Route path="/" element={<ListEmployee />} />
          <Route path="/employees" element={<ListEmployee />} />
          <Route path="/add-employee" element={<Employee />} />
          <Route path="/edit-employee/:id" element={<Employee />} />
          <Route path="/departments" element={<ListDepartment />} />
          <Route path="/add-department" element={<Department />} />
          <Route path="/edit-department/:id" element={<Department />} />
          <Route path="/todos" element={<ListTodo />} />
          <Route path="/add-todo" element={<Todo />} />
          <Route path="/edit-todo/:id" element={<Todo />} />
          <Route
            path="/register"
            element={<Register setIsAuth={setIsAuth} />}
          />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      <Footer />
    </Router>
  );
}

export default App;
