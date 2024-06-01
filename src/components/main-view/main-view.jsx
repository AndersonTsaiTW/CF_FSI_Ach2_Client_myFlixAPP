import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("token"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://andersonmovie-fda719d938ac.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
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

  const similarMovies = useMemo(() => {
    if (!selectedMovie) return [];

    return movies.filter(movie => movie.genre === selectedMovie.genre
      && movie.id !== selectedMovie.id);
  }, [movies, selectedMovie]);

  return (
    <Row>
      {!user ? (
        <Row className="form-container justify-content-center align-items-center">
          <Col className="form-container" md={8} lg={6}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
          </Col>
          <Col md={8} lg={6}>
            <br></br>
            <span style={{ fontSize: '24px', color: '#007bff' }}>or </span>
            <span style={{ fontSize: '24px', color: '#ff5c5c' }}> Create Your Account NOW!!!</span>
            <br></br>
            <br></br>
          </Col>
          <Col className="form-container" md={8} lg={6}>
            <SignupView />
          </Col>
        </Row>
      ) : selectedMovie ? (
        <Col>
          <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
          <hr />
          <h2>Similar Movies</h2>
          {similarMovies.length > 0 ? (
            similarMovies.map((movie) => <li key={movie.id}>{movie.title}</li>)
          ) : (
            <Col>There is no similar movie.</Col>
          )}
        </Col>
      ) : (movies.length === 0) ? (
        <Col>The list is empty!
          <Button onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}>Logout</Button>
        </Col>
      ) : (
        <Row className="justify-content-center">
          {movies.map((movie) => (

            <Col md={2} className="m-1 p-1 rounded">
              <MovieCard movieData={movie} key={movie.id}
                onMovieClick={(newSelectedMovie) => {
                  // console.log(newSelectedMovie);
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>

          ))}

          <Button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}>Logout</Button>
        </Row>
      )}
    </Row>
  )
}