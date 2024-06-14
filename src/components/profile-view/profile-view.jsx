import { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, accountDeleted, movies, onUpdate}) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(() => {
    const date = new Date(user.Birth_date);
    return (date.toISOString().split('T')[0])
  });

  const favoriteMovies = movies.filter(m => user.FavMovies.includes(m.id));

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birth_date: birthday
    };

    fetch(`https://andersonmovie-fda719d938ac.herokuapp.com/users/${encodeURIComponent(user.Username)}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Profile update failed');
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        onUpdate(data);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const handleDeregister = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch(`https://andersonmovie-fda719d938ac.herokuapp.com/users/${encodeURIComponent(user.Username)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.ok) {
            alert("Account delete successfully!");
            accountDeleted();
          } else {
            alert("Fail to delete account.");
          }
        });
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
                user={user}
                token={token}
                movieData={movie}
                oriFavorite={user.FavMovies.includes(movie.id)}
                onUpdateFav = {(user) => {onUpdate(user);}}
                />
              </Col>
            ))}
          </Row>
        </Col>

      </Row>

    </Container>

  )
}