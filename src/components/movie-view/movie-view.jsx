import PropTypes from "prop-types";

export const MovieView = ({ movieData, onBackClick }) => {
  // console.log(movieData); // print movie data
  return (
    <div>
      <div>
        <img src={movieData.image} alt={movieData.title} />
      </div>
      <div>
        <span>Title: {movieData.title}</span>
      </div>
      <div>
        <span>Genre: {movieData.genre}</span>
      </div>
      <button onClick = {onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movieData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};