import axios from "axios";
import { BASE_URL } from "./Config";
import { getToken } from "./AuthService";

const REST_API_BASE_URL = BASE_URL + "api/todos";

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getToken();
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const listTodos = () => axios.get(REST_API_BASE_URL);

export const createTodo = (todo) => axios.post(REST_API_BASE_URL, todo);

export const getOneTodo = (id) => axios.get(REST_API_BASE_URL + "/" + id);

export const updateTodo = (id, todo) =>
  axios.put(REST_API_BASE_URL + "/" + id, todo);

export const deleteTodo = (id) => axios.delete(REST_API_BASE_URL + "/" + id);

export const toggleComplete = (id) => axios.patch(REST_API_BASE_URL + "/" + id);
