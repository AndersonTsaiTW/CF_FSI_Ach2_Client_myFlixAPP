import { useMemo, useState } from "react";

// Import useParams from react-router to extract the movie ID from the URL parameters
import { useParams } from "react-router";

import { Link } from "react-router-dom";
import { Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

// Import FontAwesome icons to represent whether a movie is in the user's favorites list
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

// Import api
import { switchFavMovieApi } from "../../api/switch-fav-movie-api";

// Import Redux hooks and user state action creators
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

export const MovieView = () => {
  const dispatch = useDispatch();

  // Set the loacl states
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const movies = useSelector((state) => state.movies.movies);

  // Extract the movie ID from the URL parameters
  const { movieId } = useParams();

  // Retrieve the specific movie from the list using the extracted movie ID
  const selectedMovie = movies.find((m) => m.id === movieId);

  // Filter the similar movies by genre
  const similarMovies = useMemo(() => {
    return movies.filter(movie => movie.genre.Name === selectedMovie.genre.Name
      && movie.id !== selectedMovie.id);
  }, [selectedMovie]);

  // Determine if the movie is initially in the user's favorite list
  const oriFavorite = user.FavMovies.includes(movieId);
  // State to track if the movie is currently marked as favorite
  const [isFavorite, setIsFavorite] = useState(oriFavorite);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);

    // switchFavMovieApi(username, token, movieId, oriFavorite, onSuccess, onError)
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
    <Row>

      <Col md={5} className="full-height-col">
        <img className="movie-view-image" src={selectedMovie.image} alt={selectedMovie.title} />
      </Col>

      <Col className="full-height-col">
        <Row className="flex-row">
          <div>
            <div style={{ width: 'auto', maxWidth: '40px' }}>
              <Button variant="outline-primary" onClick={handleFavoriteClick} className="button-icon">
                <FontAwesomeIcon icon={isFavorite ? fasHeart : farHeart} />
              </Button>
            </div>

            <h2>{selectedMovie.title}</h2>
            <h5>
              <span>Genre: </span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id={`tooltip-right`}>
                    {selectedMovie.genre.Description}
                  </Tooltip>
                }
              >
                <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                  {selectedMovie.genre.Name}
                </span>
              </OverlayTrigger>
              <span>  //  Release Year: {selectedMovie.releaseYear}</span>
            </h5>
            <h5>
              <span>Director: </span>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id={`tooltip-right`}>
                    {selectedMovie.director.Bio}
                  </Tooltip>
                }
              >
                <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                  {selectedMovie.director.Name}
                </span>
              </OverlayTrigger>
              <span>  // Actors: {selectedMovie.actors.join(", ")}</span>
            </h5>
            <p className="black-text">{selectedMovie.description}</p>
          </div>
        </Row>

        <Row className="flex-row">
          <p>
            <br></br>
            <h2>{`Other ${selectedMovie.genre.Name} Movies`}</h2>
            {similarMovies.length > 0 ? (
              similarMovies.map((movie) => <li key={movie.id}>{movie.title}</li>)
            ) : (
              <Col>There is no similar movie.</Col>
            )}
            <Link to="/" >
              <Button variant="secondary">Back</Button>
            </Link>
          </p>
        </Row>

      </Col>

    </Row>

  );
};