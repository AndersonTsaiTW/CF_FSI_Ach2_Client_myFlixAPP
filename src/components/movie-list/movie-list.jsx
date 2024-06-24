import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";

import { Row, Col } from "react-bootstrap";

export const MovieList = () => {
  const movies = useSelector((state) => state.movies.movies);

  const filter = useSelector((state) =>
    state.movies.filter).trim().toLowerCase();

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
              <Col md={2} className="m-1 p-1 rounded" key={movie.id}>
                <MovieCard
                  movie={movie}
                />
              </Col>
            )))
        }
      </Row>


    </>
  )
}

