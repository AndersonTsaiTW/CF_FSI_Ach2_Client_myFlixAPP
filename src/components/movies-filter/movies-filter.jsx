import React from "react";
import { Form } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/reducers/movies";

export const MoviesFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.movies.filter);

  return (
    <Form.Control
    type = "text"
    placeholder = "Search..."
    value={filter}
    onChange = {(e) => {
      dispatch(setFilter(e.target.value))}}
    />
  );
};