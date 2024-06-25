import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export const NavigationBar = ( {logOut} ) => {
  const user = useSelector((state) => state.user.user);

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" >
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" >
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/" >
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" >
                  Profile
                </Nav.Link>
                <Nav.Link onClick={logOut}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}