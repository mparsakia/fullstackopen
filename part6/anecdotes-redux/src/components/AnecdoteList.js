import React from "react";
import { voteAnecdote, sortAnecdotes } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import { notificationAction } from "../reducers/notifReducer";

const AnecdoteList = (props) => {
  const allAnecdotes = useSelector((state) => state.anecdotes);
  const filterstate = useSelector((state) => state.filter);

  console.log(allAnecdotes);
  console.log(filterstate);

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote)); // vote for the anecdote
    dispatch(sortAnecdotes()); // update the sorting
    const voteString = `Added a vote for "${anecdote.content}"`;
    dispatch(notificationAction(voteString.toString(), 5));
  };

  dispatch(sortAnecdotes()); // presort anecdotes by number of votes (if they have any)

  const filteredAnecdotes = allAnecdotes.filter((a) =>
    a.content.toString().toLowerCase().includes(filterstate.toLowerCase())
  );
  // lowercase is to ease search functionality, while not changing the original capitalization

  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            — has {anecdote.votes} votes &nbsp;
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
