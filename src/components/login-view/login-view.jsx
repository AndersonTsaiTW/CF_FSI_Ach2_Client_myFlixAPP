import React, { useState } from "react";
import { Container, Row, Col, Card, CardGroup, Form, Button } from "react-bootstrap";

// import api function
import { loginUserApi } from "../../api/login-user-api";

// Import Redux dispatch hook and user state action creators
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers/user";


export const LoginView = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // loginUserApi(username, password, onSuccess, onNoUser, onError)
    loginUserApi(
      username,
      password,
      (data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
      },
      () => {
        alert("No such user")
      },
      () => {
        console.error("Login error: ", e);
        alert("Something went wrong");
      }
    )
  }

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <Card style={{ height: '300px' }}>
        <Card.Header className="card-header">Login to see the lovely movies!</Card.Header>
        <Form className="form-container" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              minlength="4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              minlength="4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </Card>
    </Container>
  )
}