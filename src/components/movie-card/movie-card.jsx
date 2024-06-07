import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movieData }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movieData.image} />
      <Card.Body>
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.genre}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movieData.id)}`} >
          <Button variant="outline-primary">
            Open
          </Button>
        </Link>
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