import React, { useState } from "react";
import { Container, Row, Col, Card, CardGroup, Form, Button } from "react-bootstrap";

import { loginUserApi } from "../../api/login-user-api";


export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("AndersonTsai");
  const [password, setPassword] = useState("pass666");

  const handleSubmit = (event) => {
    event.preventDefault();

    loginUserApi(
      username,
      password,
      (data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        onLoggedIn(data.user, data.token);
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