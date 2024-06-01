import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [birthday, setBirthday] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birth_date: birthday
    };

    fetch("https://andersonmovie-fda719d938ac.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful");
          window.location.reload();
        } else {
          alert("Signup failed");
        }
      });
  }

  return (
    <Card style={{ height: '300px'}}>
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
  )
}