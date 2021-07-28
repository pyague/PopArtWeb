import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Button, Form, Alert, Row, Container, Col, Modal} from "react-bootstrap";



function Registro() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [artist, setArtist] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState({});
  const [feedback, setFeedback] = useState("");
  const [show, setShow] = useState(false);
  function registrar() {
    let usuario = {
      name: name,
      surname: surname,
      password: password,
      location: location,
      artist: artist,
      email: email,
      age: age,
      phone: phone,
    };

    fetch("http://localhost:3001/usuarios/registro", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify(usuario),
    })
      .then((res) => res.json())
      .then((datos) => {
        setData(datos);
        console.log(datos.nuevo);
        if (datos.nuevo === true) {
          setShow(true);
        } else {
          setFeedback( <Alert variant="danger">El email ya está en uso</Alert>);
        }
        console.log(datos);
      });
  }

  /* data almacena la respuesta que yo le mando en el servidor */

  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
           
            <section class="py-5 text-center container">
            
            <div class="mx-auto">
            <h1 class="fw-light">Regístrate</h1>
            <p class="lead text-muted">
              Asegúrate de rellenar correctamente todos los campos. 
            </p>
            <p class="lead text-muted">
             ¿Ya tienes una cuenta? <Link to="/login"> Inicia sesión. </Link>
           </p>
            </div>
            
            </section>
           
          </Col>
        </Row>
        <Row className="pb-5">
          <Col sm={3}></Col>
          <Col sm={6}>
            <Form className="form">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  placeholder="Nombre"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSurname">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  placeholder="Apellidos"
                  type="text"
                  onChange={(e) => setSurname(e.target.value)}
                  value={surname}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                  placeholder="DD/MM/YYYY"
                  type="date"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLocation">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  placeholder="Ciudad"
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  placeholder="Telefono"
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Email"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Form.Text className="text-muted">
                  No compartiremos tu email con nadie.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Elige una contraseña</Form.Label>
                <Form.Control
                  placeholder="******"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>¿Eres artista?</Form.Label>
                {["radio"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Si"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onChange={(e) => setArtist(true)}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                      onChange={(e) => setArtist(false)}
                    />
                  </div>
                ))}
              </Form.Group>
                <Button id="info" onClick={() => registrar()} variant="success">Registrarme</Button>
            </Form>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
      {feedback}
      <Modal show={show}>
            <Modal.Header>
              
              <Modal.Title>Modal heading</Modal.Title>
              <Button onClick={()=>setShow(false)}>X</Button>
            </Modal.Header>
            <Modal.Body><Alert variant="success">Registrado correctamente</Alert></Modal.Body>
            <Modal.Footer>
              
              <Button variant="secondary" as={Link} to="/login">
              Iniciar sesión
              </Button>
              
            </Modal.Footer>
          </Modal>
    </>
  );
}

export default Registro;
