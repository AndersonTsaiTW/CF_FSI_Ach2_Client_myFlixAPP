import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Row, Col } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";

export const DirectorView = () => {
  const movies = useSelector((state) => state.movies.movies);

  const { directorname } = useParams();

  const sameDirectorMovies = useMemo(() => {
    return movies.filter(movie => movie.director.Name === directorname);
  }, []);

  console.log(sameDirectorMovies);
  const director = sameDirectorMovies[0].director;

  if (!director) {
    return <div>No director found</div>;
  }

  return (
    <>
      <Row>
        <h1>{director.Name}</h1>
        <h4>from {director.Birth} to {(director.Death == null) ? ("now") : (director.Death)}</h4>
        <p className="black-text">{director.Bio}</p>
      </Row>
      <Row>
        {sameDirectorMovies.map((movie) => {
          return (
            <Col md={3} className="p-1 rounded" key={movie.id}>
              <MovieCard
                movie={movie}
              />
            </Col>
          )
        })}
      </Row>
    </>
  )


}