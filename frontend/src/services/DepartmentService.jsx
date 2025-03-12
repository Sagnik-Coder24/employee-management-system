import axios from "axios";
import { BASE_URL } from "./Config";

const REST_API_BASE_URL = BASE_URL + "api/departments";

export const listDepartments = () => axios.get(REST_API_BASE_URL);

export const createDepartment = (dept) => axios.post(REST_API_BASE_URL, dept);

export const getOneDepartment = (id) => axios.get(REST_API_BASE_URL + "/" + id);

export const updateDepartment = (id, dept) =>
  axios.put(REST_API_BASE_URL + "/" + id, dept);

export const deleteDepartment = (id) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
