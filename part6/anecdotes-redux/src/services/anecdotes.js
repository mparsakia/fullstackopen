import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// createNew needs to return an anecdote obj in the proper format
const createNew = async (content) => {
  const newobj = { content, votes: 0 }; // db.json will generate and attach the ID
  const res = await axios.post(baseUrl, newobj);
  return res.data;
};

const update = async (id, anec) => {
  const request = axios.put(`${baseUrl}/${id}`, anec);
  const response = await request;
  return response.data;
};

export default { getAll, createNew, update };
