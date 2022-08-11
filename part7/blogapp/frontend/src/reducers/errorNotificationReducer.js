const errorNotificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW_ERROR_NOTIFICATION":
      return action.errorNotification;
    case "CLEAR_ERROR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

let timeoutID;

export const showErrorNotification = (errorNotification) => {
  return {
    type: "SHOW_ERROR_NOTIFICATION",
    errorNotification,
  };
};

export const clearErrorNotification = () => {
  return {
    type: "CLEAR_ERROR_NOTIFICATION",
  };
};

export const setErrorNotification = (errorNotification, seconds) => {
  return async (dispatch) => {
    dispatch(showErrorNotification(errorNotification));
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(clearErrorNotification());
    }, seconds * 1000);
  };
};

export default errorNotificationReducer;
