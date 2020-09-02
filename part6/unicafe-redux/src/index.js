import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from 'react-redux'
import counterReducer from "./reducer";
// import reducer from "./reducer";
// const store = createStore(reducer);

const store = createStore(counterReducer);

const App = () => {
  
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  const neutral = () => {
    store.dispatch({
      type: "NEUTRAL",
    });
  };

  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const resetstats = () => {
    store.dispatch({
      type: "RESET",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <span> good {store.getState().good}</span>
      <br></br><br></br>

      <button onClick={neutral}>neutral</button>
      <span> neutral {store.getState().neutral}</span>
      <br></br><br></br>

      <button onClick={bad}>bad</button>
      <span> bad {store.getState().bad}</span>
      <br></br><br></br>

      <button onClick={resetstats}>reset stats</button>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
};

renderApp();
store.subscribe(renderApp);
