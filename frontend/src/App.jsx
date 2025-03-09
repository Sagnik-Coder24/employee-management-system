import "./App.css";
import Department from "./components/Department";
import Employee from "./components/Employee";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ListDepartment from "./components/ListDepartment";
import ListEmployee from "./components/ListEmployee";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<ListEmployee />} />
        <Route path="/employees" element={<ListEmployee />} />
        <Route path="/add-employee" element={<Employee />} />
        <Route path="/edit-employee/:id" element={<Employee />} />
        <Route path="/departments" element={<ListDepartment />} />
        <Route path="/add-department" element={<Department />} />
        <Route path="/edit-department/:id" element={<Department />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
