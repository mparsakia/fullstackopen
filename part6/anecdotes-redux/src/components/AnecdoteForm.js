import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const newContent = event.target.AnecdoteInput.value;
    event.target.AnecdoteInput.value = "";
    const newAnec = await anecdoteService.createNew(newContent);
    // newAnec will be assigned as obj in the format we need to pass to createAnecdote reducer
    dispatch(createAnecdote(newAnec));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="AnecdoteInput" />
          &nbsp;
          <button>create</button>
        </div>
      </form>
    </div>
  );
};

export default AnecdoteForm;
