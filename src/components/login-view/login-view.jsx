import React, { useState } from "react";
import { Container, Row, Col, Card, CardGroup, Form, Button } from "react-bootstrap";


export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("AndersonTsai");
  const [password, setPassword] = useState("pass666");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://andersonmovie-fda719d938ac.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        console.error("Login error: ", e);
        alert("Something went wrong");
      });
  }

  return (
      <Card style={{ height: '300px'}}>
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

  )
}