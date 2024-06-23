import { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

import { switchFavMovieApi } from "../../api/switch-fav-movie-api";

export const MovieCard = ({ user, token, movieData, oriFavorite, onUpdateFav }) => {
  const [isFavorite, setIsFavorite] = useState(oriFavorite);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);

    switchFavMovieApi(
      user.Username,
      token,
      movieData.id,
      oriFavorite,
      (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        onUpdateFav(data);
        window.location.reload();
      },
      (error) => {
        alert(error.message)
      }
    )
  }

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movieData.image} />
      <Card.Body>
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.genre}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movieData.id)}`} >
          <Button variant="outline-primary">Open</Button>
        </Link>

        <Button variant="outline-primary" onClick={handleFavoriteClick}>
          <FontAwesomeIcon icon={isFavorite ? fasHeart : farHeart} />
        </Button>
      </Card.Body>
    </Card>
  )
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string
  }).isRequired,
};