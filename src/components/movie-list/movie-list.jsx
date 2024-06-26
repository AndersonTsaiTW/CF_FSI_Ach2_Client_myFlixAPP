import React from "react";
import { Row, Col } from "react-bootstrap";

import { useSelector } from "react-redux";

// import components
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";


export const MovieList = () => {
  const movies = useSelector((state) => state.movies.movies);

  // Retrieve and normalize the movie filter string from Redux state
  const filter = useSelector((state) =>
    state.movies.filter).trim().toLowerCase();

  // Filter movies based on the search term in 'filter' to get the filtered movies list
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter));

  return (
    <>
    
      <Row>
        <MoviesFilter />
      </Row>

      <Row>
        {
          (movies.length === 0) ? (
            <Col>The list is empty!</Col>
          ) : (
            filteredMovies.map((movie) => (
              <Col md={3} className="m-0.5 p-1 rounded" key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            )))
        }
      </Row>

    </>
  )
}

