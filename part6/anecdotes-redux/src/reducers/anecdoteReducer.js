import anecdoteService from "../services/anecdotes";

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "SORT": {
      return state.sort((a, b) => b.votes - a.votes); // sort by votes and return sorted array
    }
    case "CREATE": {
      return state.concat(action.data);
    }
    case "VOTE": {
      const id = action.data.id;
      const updatedState = state.map((x) => (x.id !== id ? x : action.data));
      return updatedState;
    }
    case "INIT_ANECDOTES": {
      return action.data;
    }
    default:
      return state;
  }
};

export const initializeAnecdotes = (anec) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const createAnecdote = (obj) => {
  // we are passed an obj in the proper format, so the data is just the obj itself
  return {
    type: "CREATE",
    data: obj,
  };
};

export const voteAnecdote = (anc) => {
  return async (dispatch) => {
    const updatedAnec = await anecdoteService.update(anc.id, {
      ...anc,
      votes: anc.votes + 1,
    });

    dispatch({
      type: "VOTE",
      data: updatedAnec,
    });
  };
};

export const sortAnecdotes = () => {
  return {
    type: "SORT",
  };
};

export default anecdoteReducer;
