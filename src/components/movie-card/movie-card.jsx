import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <Card className="h-100" onClick = {() => { onMovieClick(movieData)}}>
      <Card.Img variant = "top" src = {movieData.image} />
      <Card.Body>
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.genre}</Card.Text>
        <Button onClick={() => {onMovieClick(movieData);}} variant="link">
          Open
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
  onMovieClick: PropTypes.func.isRequired
};