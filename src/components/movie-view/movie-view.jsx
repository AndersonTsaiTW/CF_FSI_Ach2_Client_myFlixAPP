import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

export const MovieView = ({ user, token, movieData, onUpdateFav }) => {
  const { movieId } = useParams();
  const selectedMovie = movieData.find((m) => m.id === movieId);

  const similarMovies = useMemo(() => {
    return movieData.filter(movie => movie.genre === selectedMovie.genre
      && movie.id !== selectedMovie.id);
  }, [selectedMovie]);

  const oriFavorite = user.FavMovies.includes(movieId);
  const [isFavorite, setIsFavorite] = useState(oriFavorite);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);

    const url = `https://andersonmovie-fda719d938ac.herokuapp.com/users/${encodeURIComponent(user.Username)}/movies/${encodeURIComponent(movieId)}`;
    // if oriFavorite = False: from False => True
    // add the movie in FavMovies and update user
    const method = oriFavorite ? "DELETE" : "POST";

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fail to ${oriFavorite ? 'delete' : 'add'} favorite movie`);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        onUpdateFav(data);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

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
      <Button variant="outline-primary" onClick={handleFavoriteClick}>
        <FontAwesomeIcon icon={isFavorite ? fasHeart : farHeart} />
      </Button>

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