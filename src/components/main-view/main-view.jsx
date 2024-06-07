import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("token"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

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

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }} />
      <Row>
        <Routes>
          <Route path="/signup" element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col className="form-container" md={8} lg={6}>
                  <SignupView />
                </Col>
              )}
            </>
          } />

          <Route path="/login" element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col className="form-container" md={8} lg={6}>
                  <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }} />
                </Col>
              )}
            </>
          } />

          <Route path="movies/:movieId" element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (movies.length === 0) ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col>
                  <MovieView movieData={movies} />
                </Col>
              )}
            </>
          } />

          <Route path="/" element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (movies.length === 0) ? (
                <Col>The list is empty!</Col>
              ) : (
                <Row className="justify-content-center">
                  {movies.map((movie) => (
                    <Col md={2} className="m-1 p-1 rounded">
                      <MovieCard movieData={movie} key={movie.id}
                      />
                    </Col>
                  ))}

                  {/* <Button
                    onClick={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}>Logout</Button> */}
                </Row>
              )}
            </>
          } />

        </Routes>
      </Row>
    </BrowserRouter>

  )
}