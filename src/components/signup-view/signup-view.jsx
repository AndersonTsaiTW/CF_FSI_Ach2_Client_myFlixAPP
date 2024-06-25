import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { signupUserApi } from "../../api/signup-user-api";

export const SignupView = () => {
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
        alert("Signup successful");
        window.location.reload();
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