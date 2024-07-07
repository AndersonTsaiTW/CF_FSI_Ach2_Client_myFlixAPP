import React from "react";
import { useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import components
import { MovieList } from "../movie-list/movie-list";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { DirectorView } from "../director-view/director-view";

// import api function
import { getAllMoviesApi } from "../../api/get-all-movies-api";

// Import Redux hooks and action creators
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser, setToken } from "../../redux/reducers/user";

export const MainView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const movies = useSelector((state) => state.movies.movies);

  // Use the useEffect hook to initialize user state upon component mount
  // It retrieves user information and token from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = JSON.parse(localStorage.getItem("token"));

    if (storedUser && storedToken) {
      dispatch(setUser(storedUser));
      dispatch(setToken(storedToken));
    }
  }, []);

  // Use the useEffect hook to initialize movies state upon component mount
  useEffect(() => {
    if (!token) {
      return;
    }

    // getAllMoviesApi( token, onSuccess )
    getAllMoviesApi(
      token,
      (data) => {
        const moviesFromApi = data.map((rowData) => {
          return {
            id: rowData._id,
            title: rowData.Title,
            image: rowData.ImagePath,
            genre: rowData.Genre,
            description: rowData.Description,
            releaseYear: rowData.ReleaseYear,
            director: rowData.Director,
            actors: rowData.Actors
          }
        });
        console.log(moviesFromApi);
        dispatch(setMovies(moviesFromApi));
      }
    )
  }, [token]);

  // logOut is used by NavigateBar and user deregister in ProfilView 
  const logOut = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(setUser(null));
      dispatch(setToken(null));
      localStorage.clear();
    }
  };

  return (
    <BrowserRouter>
      <NavigationBar logOut={logOut} />
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
                  <ProfileView logOut={logOut} />
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

          <Route path="movies/directors/:directorname" element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (movies.length === 0) ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col>
                  <DirectorView />
                </Col>
              )}
            </>
          } />

          <Route path="/" element={
            <>
              {(!user || !movies) ? (
                <Navigate to="/login" replace />
              ) : (<MovieList />)}
            </>
          } />
        </Routes>

      </Row>
    </BrowserRouter>
  )
}