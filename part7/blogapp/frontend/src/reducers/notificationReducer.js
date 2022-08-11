const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return action.notification;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

let timeoutID;

export const showNotification = (notification) => {
  return {
    type: "SHOW_NOTIFICATION",
    notification,
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    dispatch(showNotification(notification));
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationReducer;
