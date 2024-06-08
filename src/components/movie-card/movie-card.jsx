import { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

export const MovieCard = ({ user, token, movieData, oriFavorite, onUpdateFav }) => {
  const [isFavorite, setIsFavorite] = useState(oriFavorite);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);

    const url = `https://andersonmovie-fda719d938ac.herokuapp.com/users/${encodeURIComponent(user.Username)}/movies/${encodeURIComponent(movieData.id)}`;

    // if oriFavorite = False: from False => True
    // add the movie in FavMovies and update user
    const method = oriFavorite ? "DELETE" : "POST";

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`
      }})
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