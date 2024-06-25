import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

import { switchFavMovieApi } from "../../api/switch-fav-movie-api";

import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers/user";

export const MovieView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const movies = useSelector((state) => state.movies.movies);

  const { movieId } = useParams();
  const selectedMovie = movies.find((m) => m.id === movieId);

  const similarMovies = useMemo(() => {
    return movies.filter(movie => movie.genre === selectedMovie.genre
      && movie.id !== selectedMovie.id);
  }, [selectedMovie]);

  const oriFavorite = user.FavMovies.includes(movieId);
  const [isFavorite, setIsFavorite] = useState(oriFavorite);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);

    switchFavMovieApi(
      user.Username,
      token,
      movieId,
      oriFavorite,
      (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setUser(data));
        // window.location.reload();  //Notice: reload page will cause state missing
      },
      (error) => {
        alert(error.message)
      }
    )
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