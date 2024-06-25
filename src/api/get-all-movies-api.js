// get all movie list
export function getAllMoviesApi( token, onSuccess ) {
  fetch("https://andersonmovie-fda719d938ac.herokuapp.com/movies", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => response.json())
    .then((data) => {
      if (onSuccess) onSuccess(data);
    }
  );
}