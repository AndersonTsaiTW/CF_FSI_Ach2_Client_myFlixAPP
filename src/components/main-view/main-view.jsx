import React from "react";
import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("token"));
  const [ user, setUser] = useState(storedUser? storedUser: null);
  const [ token, setToken] = useState(storedToken? storedToken: null);
  const [ movies, setMovies ] = useState([]);
  const [ selectedMovie, setSelectedMovie ] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://andersonmovie-fda719d938ac.herokuapp.com/movies", {
      header: { Authorization: `Bearer ${token}`}
    })
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
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user,token) => {
          setUser(user);
          setToken(token);
        }}/>
        or
        <SignupView />
      </>
  )
  };

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
      <button
      onClick={() => { 
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}>Logout</button>
    </div>)
  }
}