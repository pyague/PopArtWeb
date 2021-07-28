import { BrowserRouter, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";

function Cabecera(props) {
  function logout() {
    fetch("http://localhost:3001/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/Json",
      },
    });
    props.setUser();
  }

  if (props.user) {
    if (props.artist) {
      return (
        
        <Navbar
          collapseOnSelect
          expand="lg"
          
          className="navbar"
        >
          <Container>
            <Navbar.Brand as={Link} to="/">
            <img
                src="https://i.ibb.co/5YJf3g1/logo.png"
                width="50"
                height="50"
                alt="Busqueda"
                
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav  id="textnav"className="me-auto">
                <Nav.Link as={Link} to="/productos">
                  Productos
                </Nav.Link>
                <Nav.Link as={Link} to="/areapersonal">
                  Mis productos
                </Nav.Link>
                <Nav.Link as={Link} to="/funcionamiento">
                  Funcionamiento
                </Nav.Link>
              </Nav>
              <Nav>
                <Link to="/">
                <Button id="botonnav" variant="success" onClick={() => logout()}>
                  Cerrar sesión
                </Button>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
      );
    } else {
      return (
        <nav  id="info"> 
        <Navbar
          collapseOnSelect
          expand="lg"
          className="navbar"
          variant="light"
        >
          <Container>
            <Navbar.Brand as={Link} to="/">
            <img
                src="https://i.ibb.co/5YJf3g1/logo.png"
                width="50"
                height="50"
                alt="Busqueda"
                
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav id="textnav" className="me-auto">
                <Nav.Link as={Link} to="/productos">
                  Productos
                </Nav.Link>
                <Nav.Link as={Link} to="/faqs">
                  FAQs
                </Nav.Link>
              </Nav>
              <Nav>
                <Link to="/">
                <Button id="botonnav" variant="success"  onClick={() => logout()}>
                  Cerrar sesión
                </Button>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </nav>
      );
    }
  } else {
    return (
      <nav id="info">
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar"
        variant="light"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
          <img
                src="https://i.ibb.co/5YJf3g1/logo.png"
                width="50"
                height="50"
                alt="Busqueda"
                
              />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav id="textnav" className="me-auto">
              <Nav.Link as={Link} to="/productos">
                Productos
              </Nav.Link>
              <Nav.Link as={Link} to="/faqs">Cómo funciona</Nav.Link>
              <Nav.Link as={Link} to="/info">Sobre nosotros</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title="Login" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/login">
                  Iniciar Sesión
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/registro">Regístrate</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </nav>
    );
  }
}

export default Cabecera;
