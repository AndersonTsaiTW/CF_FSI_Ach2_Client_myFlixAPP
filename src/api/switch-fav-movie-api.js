// add a movie in user's favorite list
export async function switchFavMovieApi(username, token, movieId, oriFavorite, onSuccess, onError) {
  const url = `https://andersonmovie-fda719d938ac.herokuapp.com/users/${encodeURIComponent(username)}/movies/${encodeURIComponent(movieId)}`;

  // if oriFavorite = False: from False => True
  // add the movie in FavMovies and update user
  const method = oriFavorite ? "DELETE" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error("Fail to add favorite movie");
    }
    const data = await response.json();
    if (onSuccess) onSuccess(data);
  } catch (error) {
    if (onError) onError(error);
  }
}