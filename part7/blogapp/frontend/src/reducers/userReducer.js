import loginService from "../services/login";
import blogService from "../services/blogs";
import { useSelector } from "react-redux";
import { setNotification } from "./notificationReducer";
import { setErrorNotification } from "./errorNotificationReducer";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data;
    case "CLEAR_USER":
      return null;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    data: user,
  };
};

export const clearUser = () => {
  return {
    type: "CLEAR_USER",
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(setNotification(`${username} logged in`, 5));
    } catch (exception) {
      dispatch(setErrorNotification("Wrong username or password", 5));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    blogService.setToken("");
    window.localStorage.clear();
    dispatch(clearUser());
  };
};

export default userReducer;
