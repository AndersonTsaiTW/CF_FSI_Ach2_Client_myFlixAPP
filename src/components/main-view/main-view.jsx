import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

import { getAllMoviesApi } from "../../api/get-all-movies-api";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("token"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    getAllMoviesApi(
      token,
      (data) => {
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
      }
    )
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={logOut} />
      <Row>
        <Routes>
          <Route path="/signup" element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col className="form-container">
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
                <Col className="form-container">
                  <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }} />
                </Col>
              )}
            </>
          } />

          <Route path="/profile" element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col className="form-container">
                  <ProfileView user={user} token={token}
                    accountDeleted={logOut}
                    movies={movies}
                    onUpdate={(user) => {
                      setUser(user);
                    }}
                  />
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
                  <MovieView
                    user={user}
                    token={token}
                    movieData={movies}
                    onUpdateFav={(user) => { setUser(user); }}
                  />
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
                    <Col md={2} className="m-1 p-1 rounded" key={movie.id}>
                      <MovieCard
                        user={user}
                        token={token}
                        movieData={movie}
                        oriFavorite={user.FavMovies.includes(movie.id)}
                        onUpdateFav={(user) => { setUser(user); }}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          } />

        </Routes>
      </Row>
    </BrowserRouter>

  )
}