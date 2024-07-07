import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers/user";

import { signupUserApi } from "../../api/signup-user-api";
import { loginUserApi } from '../../api/login-user-api';

export const SignupView = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // signupUserApi(username, password, email, birthday, onSuccess, onError)
    signupUserApi(
      username,
      password,
      email,
      birthday,
      () => {
        alert("Signup successful, Login directly...");

        // login directly
        loginUserApi(
          username,
          password,
          (data) => {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", JSON.stringify(data.token));
            dispatch(setUser(data.user));
            dispatch(setToken(data.token));
            window.location.href = '/';
          },
          () => {
            alert("No such user")
          },
          (e) => {
            console.error("Login error: ", e);
            alert("Something went wrong");
          }
        )
      },
      () => {
        alert("Signup failed");
      }
    )
  }

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <Card style={{ height: '300px' }}>

        <Card.Header style={{ color: '#01949A' }}>Sign up! Become a movie lover!</Card.Header>

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

          <Button type="submit">Signup</Button>

        </Form>
      </Card>
    </Container>
  )
}