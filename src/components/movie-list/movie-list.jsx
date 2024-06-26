import React from "react";
import { Row, Col } from "react-bootstrap";

import { useSelector } from "react-redux";

// import components
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { MoviesSorter } from "../movies-sorter/movies-sorter";


export const MovieList = () => {
  const movies = useSelector((state) => state.movies.movies);
  const sortKey = useSelector((state) => state.movies.sortKey);

  // Retrieve and normalize the movie filter string from Redux state
  const filter = useSelector((state) =>
    state.movies.filter).trim().toLowerCase();

  // Filter movies based on the search term in 'filter' to get the filtered movies list
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter));

  // Because data has layer structure, use the function below to support sortedFilterMovies
  function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
  // Sort filtered movies by sort key
  const sortedFilterMovies = [...filteredMovies].sort((a, b) => {
    const aValue = getValueByPath(a, sortKey);
    const bValue = getValueByPath(b, sortKey);

    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
  });


  return (
    <>

      <Row>
        <Col md={10}><MoviesFilter /></Col>
        <Col md={2}><MoviesSorter /></Col>
      </Row>

      <Row>
        {
          (movies.length === 0) ? (
            <Col>The list is empty!</Col>
          ) : (
            sortedFilterMovies.map((movie) => (
              <Col md={3} className="m-0.5 p-1 rounded" key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            )))
        }
      </Row>

    </>
  )
}

