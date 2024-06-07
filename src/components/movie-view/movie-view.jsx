import { useMemo } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const MovieView = ({ movieData }) => {
  const { movieId } = useParams();
  const selectedMovie = movieData.find((m) => m.id === movieId);

  const similarMovies = useMemo(() => {
    return movieData.filter(movie => movie.genre === selectedMovie.genre
      && movie.id !== selectedMovie.id);
  }, [selectedMovie]);

  return (
    <div>
      <div>
        <img className="movie-view-image" src={selectedMovie.image} alt={selectedMovie.title} />
      </div>
      <div>
        <span>Title: {selectedMovie.title}</span>
      </div>
      <div>
        <span>Genre: {selectedMovie.genre}</span>
      </div>

      <p>
        <br></br>
        <h2>{`Other ${selectedMovie.genre} Movies`}</h2>
        {similarMovies.length > 0 ? (
          similarMovies.map((movie) => <li key={movie.id}>{movie.title}</li>)
        ) : (
          <Col>There is no similar movie.</Col>
        )}
        <Link to="/" >
          <Button variant="secondary">Back</Button>
        </Link>
      </p>
    </div>
  );
};

MovieView.propTypes = {
  movieData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string
  }).isRequired
};