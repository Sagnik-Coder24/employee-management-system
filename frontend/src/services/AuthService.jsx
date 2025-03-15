import axios from "axios";
import { BASE_URL } from "./Config";

const REST_API_BASE_URL = BASE_URL + "api/auth/";

export const registerUserRest = (user) =>
  axios.post(REST_API_BASE_URL + "register", user);

export const loginRest = (user) =>
  axios.post(REST_API_BASE_URL + "login", user);

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");
