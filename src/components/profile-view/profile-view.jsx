import { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";
import { deleteUserApi } from "../../api/delete-user-api";
import { updateUserApi } from "../../api/update-user-api";

import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers/user";

export const ProfileView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(() => {
    const date = new Date(user.Birth_date);
    return (date.toISOString().split('T')[0])
  });

  const movies = useSelector((state) => state.movies.movies);
  const favoriteMovies = movies.filter(m => user.FavMovies.includes(m.id));

  const logOut = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.clear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateUserApi(
      user.Username,
      token,
      username,
      password,
      email,
      birthday,
      (data) => { // onSuccess
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(setUser(data));
        window.location.reload();
      },
      (error) => { // onError
        alert(error.message);
      }
    );
  }

  const handleDeregister = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteUserApi(
        user.Username,
        token,
        () => {
          alert("Account delete successfully!");
          logOut;
        },
        () => alert("Fail to delete account.")
      );
    }
  }


  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header style={{ color: '#01949A' }}>You can update your information~</Card.Header>
            <Form className="form-container" onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username: </Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  minLength="4"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Update password HERE"
                  minLength="4"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </Form.Group>

              <Form.Group>
                <Form.Label>Birth_date: </Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="m-1">Update</Button>
              <Button variant="danger" onClick={handleDeregister} className="m-1">Deregister</Button>
            </Form>
          </Card>
        </Col>

        <Col>
          <Row>
            <div>Your favorite movies</div>
          </Row>
          <Row>
            {favoriteMovies.map((movie) => (
              <Col md={3} className="p-1 rounded" key={movie.id}>
                <MovieCard
                  movie={movie}
                />
              </Col>
            ))}
          </Row>
        </Col>

      </Row>

    </Container>

  )
}