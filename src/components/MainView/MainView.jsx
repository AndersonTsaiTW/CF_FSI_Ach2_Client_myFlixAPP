import React from "react";
import { useState, useEffect } from "react";

import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";

export const MainView = () => {
  const [ movies, setMovies ] = useState([]);

  useEffect(() => {
    fetch("https://andersonmovie-fda719d938ac.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((rowData) => {
        return {
          id: rowData._id,
          title: rowData.Title,
          image: rowData.ImagePath,
          genre: rowData.Genre.Name
        }
      });
      console.log(moviesFromApi);
      setMovies(moviesFromApi);
    });
  }, []);

  const [ selectedMovie, setSelectedMovie ] = useState(null);
  if (selectedMovie) {
    let similarMovies = movies.filter(checkGenre);
    function checkGenre(movies) {
      return movies.genre === selectedMovie.genre
      && movies.id !== selectedMovie.id;
    }
    console.log(similarMovies);

    return (
      <>
        <MovieView movieData={selectedMovie} onBackClick={()=>setSelectedMovie(null)} />
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => <li key={movie.id}>{movie.title}</li>)}
      </>
    )
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>
  } else {
    return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movieData={movie}
        onMovieClick = {(newSelectedMovie) => {
          // console.log(newSelectedMovie);
          setSelectedMovie(newSelectedMovie);
        }}
        />
      ))}
    </div>)
  }
}