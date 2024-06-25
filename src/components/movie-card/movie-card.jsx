import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import FontAwesome icons to represent whether a movie is in the user's favorites list
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

// import api function
import { switchFavMovieApi } from "../../api/switch-fav-movie-api";

// Import Redux hooks and user state action creators
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

// MovieCard presents a single movie's data passed via the prop "movie"
export const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  // Retrieve user and token from the Redux store's user state
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  // Determine if the movie is initially in the user's favorite list
  const oriFavorite = user.FavMovies.includes(movie.id);
  // State to track if the movie is currently marked as favorite
  const [isFavorite, setIsFavorite] = useState(oriFavorite);


  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);

    // switchFavMovieApi(username, token, movieId, oriFavorite, onSuccess, onError)
    switchFavMovieApi(
      user.Username,
      token,
      movie.id,
      oriFavorite,
      (data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setUser(data));
        // window.location.reload(); //Notice: reload page will cause state missing
      },
      (error) => {
        alert(error.message)
      }
    )
  }

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genre}</Card.Text>

        <Link to={`/movies/${encodeURIComponent(movie.id)}`} >
          <Button variant="outline-primary">Open</Button>
        </Link>

        <Button variant="outline-primary" onClick={handleFavoriteClick}>
          <FontAwesomeIcon icon={isFavorite ? fasHeart : farHeart} />
        </Button>
      </Card.Body>
    </Card>
  )
};