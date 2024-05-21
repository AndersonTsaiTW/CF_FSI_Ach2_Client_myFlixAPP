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
          id: rowData._id.$oid,
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
    return <MovieView movieData={selectedMovie} onBackClick={()=>setSelectedMovie(null)} />
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>
  } else {
    return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movieData={movie}
        onMovieClick = {(newSelectedMovie) => {
          console.log(newSelectedMovie);
          setSelectedMovie(newSelectedMovie);
        }}
        />
      ))}
    </div>)
  }
}