const initialstate = "";

const reducer = (state = initialstate, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "SET_NOTIFICATION_TEXT":
      return action.data.text;

    case "REMOVE_NOTIFICATION_TEXT":
      return "";

    default:
      return state;
  }
};

export const notificationText = (text) => {
  return {
    type: "SET_NOTIFICATION_TEXT",
    data: {
      text: text,
    },
  };
};

export const removeNotifText = () => {
  return {
    type: "REMOVE_NOTIFICATION_TEXT",
  };
};

// deals with setTimeout() in notificationAction; stops buggin out on multiple votes
let timeoutID = 0;

export const notificationAction = (text, duration) => {
  if (timeoutID) {
    clearTimeout(timeoutID);
  }
  return async (dispatch) => {
    dispatch({ type: "SET_NOTIFICATION_TEXT", data: { text: text } });
    timeoutID = setTimeout(() => {
      dispatch({ type: "REMOVE_NOTIFICATION_TEXT" });
    }, duration * 1000);
  };
};

export default reducer;
