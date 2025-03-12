import axios from "axios";
import { BASE_URL } from "./Config";

const REST_API_BASE_URL = BASE_URL + "api/employees";

export const listEmployees = () => axios.get(REST_API_BASE_URL);

export const createEmployee = (employee) =>
  axios.post(REST_API_BASE_URL, employee);

export const getOneEmployee = (id) => axios.get(REST_API_BASE_URL + "/" + id);

export const updateEmployee = (id, emp) =>
  axios.put(REST_API_BASE_URL + "/" + id, emp);

export const deleteEmployee = (id) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
