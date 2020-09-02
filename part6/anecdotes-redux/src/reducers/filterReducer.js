const filterReducer = (state = "", action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "FILTER":
      return action.filter;
    default:
      return state;
  }
};

export const filterAction = (filter) => {
  return {
    type: "FILTER",
    filter: filter,
  };
};

export default filterReducer;
