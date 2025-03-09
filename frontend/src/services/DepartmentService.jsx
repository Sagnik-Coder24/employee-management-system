import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/departments";

export const listDepartments = () => axios.get(REST_API_BASE_URL);

export const createDepartment = (dept) => axios.post(REST_API_BASE_URL, dept);

export const getOneDepartment = (id) => axios.get(REST_API_BASE_URL + "/" + id);

export const updateDepartment = (id, emp) =>
  axios.put(REST_API_BASE_URL + "/" + id, emp);

export const deleteDepartment = (id) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
