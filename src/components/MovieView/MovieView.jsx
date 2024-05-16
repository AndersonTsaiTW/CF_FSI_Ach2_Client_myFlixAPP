export const MovieView = ({ movieData, onBackClick }) => {
  console.log(movieData); // 在這裡印出 movieData
  return (
    <div>
      <div>
        <img src={movieData.ImagePath} alt={movieData.Title} />
      </div>
      <div>
        <span>Title: {movieData.Title}</span>
      </div>
      <div>
        <span>Genre: {movieData.Genre.Name}</span>
      </div>
      <button onClick = {onBackClick}>Back</button>
    </div>
  );
}