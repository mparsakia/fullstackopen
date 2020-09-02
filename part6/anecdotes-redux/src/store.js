import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notifReducer from "./reducers/notifReducer";
import filterReducer from "./reducers/filterReducer";
import anecdoteReducer from "./reducers/anecdoteReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notifReducer,
  filter: filterReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
