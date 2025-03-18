import axios from "axios";
import { BASE_URL } from "./Config";

const REST_API_BASE_URL = BASE_URL + "api/auth/";

export const registerUserRest = (user) =>
  axios.post(REST_API_BASE_URL + "register", user);

export const loginRest = (user) =>
  axios.post(REST_API_BASE_URL + "login", user);

export const getUserName = async (username) => {
  try {
    const res = await axios.post(REST_API_BASE_URL + "getName", username, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return res.data;
  } catch (err) {
    return err.response?.data?.message || "An error occurred";
  }
};

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username, role) => {
  localStorage.setItem("authenticatedUser", username);
  localStorage.setItem("authenticatedUserRole", role);
};

export const isUserLoggedIn = () =>
  localStorage.getItem("authenticatedUser") === null ? false : true;

export const getLoggedInUser = () => localStorage.getItem("authenticatedUser");

export const getLoggedInUserRole = () =>
  localStorage.getItem("authenticatedUserRole");

export const logout = () => {
  localStorage.clear();
};
