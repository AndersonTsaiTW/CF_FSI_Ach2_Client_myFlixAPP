import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import { MovieCard } from "../movie-card/movie-card";
import { MovieList } from "../movie-list/movie-list";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

import { getAllMoviesApi } from "../../api/get-all-movies-api";

import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser, setToken } from "../../redux/reducers/user";

export const MainView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const movies = useSelector((state) => state.movies.movies);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("token"));

  if (storedUser && storedToken) {
    dispatch(setUser(user));
    dispatch(setToken(token));
  }
  
  // const [user, setUser] = useState(storedUser ? storedUser : null);
  // const [token, setToken] = useState(storedToken ? storedToken : null);
  // const [movies, setMovies] = useState([]);

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
        dispatch(setMovies(moviesFromApi));
      }
    )
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar />
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
                  <LoginView />
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
                  <ProfileView />
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
                  <MovieView />
                </Col>
              )}
            </>
          } />

          <Route path="/" element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (<MovieList />)}
            </>
          } />

        </Routes>
      </Row>
    </BrowserRouter>

  )
}