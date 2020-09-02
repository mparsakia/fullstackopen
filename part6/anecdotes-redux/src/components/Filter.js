import React from "react";
import { useDispatch } from "react-redux";
import { filterAction } from "../reducers/filterReducer";

const Filter = (props) => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    const filtertext = event.target.value;
    dispatch(filterAction(filtertext));
  };

  return (
    <div>
      filter <input onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
