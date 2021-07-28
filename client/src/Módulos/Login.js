import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Button, Form, Alert, Row, Container, Col, Modal } from "react-bootstrap";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);
  function iniciarSesion() {
    let usuario = {
      email: email,
      password: password,
    };
    fetch("http://localhost:3001/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify(usuario),
    })
      .then((res) => res.json())
      .then((datos) => {
        props.setUser(datos.logged);
        
        console.log(data);
        if (datos.logged === true) {
          setShow(true)
          props.setArtist(datos.user.artist);
        props.setUsername(datos.user.email);
        props.setNombre(datos.user.name)
        } else {
          setFeedback( <Alert variant="danger">Email o contraseña incorrecta.</Alert>);
        }
      });
  }

  return (
    <>
    <Container className="pb-5">
      {/* <Row>
    <Col sm={{ span: 3, offset: 6 }}>
    <img class="mb-4" src="https://i.ibb.co/g9VZ82C/logo.png" width="200" height="170"></img>
    </Col>
    </Row> */}
      <Row>
      <Col md={{ span: 8, offset: 2 }}>
           
           <section class="py-5 text-center container">
           
           <div class="mx-auto">
           <h1 class="fw-light">Inicia sesión</h1>
           <p class="lead text-muted">
             ¿No tienes cuenta? <Link to="/registro">¡Regístrate aqui!</Link>
           </p>
           </div>
           
           </section>
          
         </Col>
      </Row>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <Form className="form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
            
              <Button id="info" variant="success" onClick={() => iniciarSesion()}>
                Acceder
              </Button>
          </Form>
          {feedback}
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
    <Modal show={show}>
    <Modal.Header>
      
    </Modal.Header>
    <Modal.Body><Alert variant="success">¡Login correcto!</Alert></Modal.Body>
    <Modal.Footer>
      
      <Button id="botonnav"variant="secondary" as={Link} to="/">
      OK
      </Button>
      
    </Modal.Footer>
  </Modal>
    </>
  );
}

export default Login;
