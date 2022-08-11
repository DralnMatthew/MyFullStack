import userService from "../services/users";
import { setErrorNotification } from "./errorNotificationReducer";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data;
    default:
      return state;
  }
};

export const setUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch({
        type: "INIT_USERS",
        data: users,
      });
    } catch (error) {
      setErrorNotification("Fail to fetch users", 5);
    }
  };
};

export default usersReducer;
