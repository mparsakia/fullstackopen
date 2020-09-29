import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Suggested from "./components/Suggested";
import {
  useQuery,
  useMutation,
  useApolloClient,
  useSubscription,
} from "@apollo/client";
import {
  GET_AUTHORS,
  GET_BOOKS,
  CREATE_BOOK,
  UPDATE_AUTHOR,
  GET_USER,
  BOOK_ADDED,
} from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const authors = useQuery(GET_AUTHORS);
  const books = useQuery(GET_BOOKS);
  const user = useQuery(GET_USER);

  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const updateCacheWith = (addedbook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: GET_BOOKS });
    console.log("dataInStore", dataInStore);

    if (!includedIn(dataInStore.allBooks, addedbook)) {
      client.writeQuery({
        query: GET_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedbook) },
      });
    }
  };

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook);
    },
  }); // see "updating the cache" in part 8.b & 8.d subscriptions

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedbook = subscriptionData.data.bookAdded;
      console.log("BOOK_ADDED data recieved: ", subscriptionData);
      notify(`${subscriptionData.data.bookAdded.title} added`);
      updateCacheWith(addedbook);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setToken(token);
    }
  }, []);

  const logout = () => {
    setToken(null);
    window.localStorage.clear();
    client.resetStore(); // be vigilant about the cached data, clear it on logout
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("suggested")}>suggested</button>
        <i> &mdash; </i>
        <button onClick={logout}>logout</button>
      </div>
      <Authors
        authors={authors}
        editAuthor={editAuthor}
        show={page === "authors"}
      />
      <Books books={books} show={page === "books"} />
      <NewBook addBook={addBook} show={page === "add"} />
      <Suggested user={user} books={books} show={page === "suggested"} />
    </div>
  );
};

export default App;
