import { useState, useEffect } from "react";
import { BrowserRouter, Router, Link } from "react-router-dom";
import { Card, ListGroup, Button, Modal, Alert } from "react-bootstrap";

function Productos(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/productos/mostrar", {
      method: "GET",
      credentials: "include",
    })
      .then((results) => results.json())
      .then((data) => {
        setData(data.datos); //la info que nos llega de la API y la guardamos en el estado
        setLoading(false);
      });
  }, []);

  function filterProductsBySearch(producto) {
    console.log(producto.etiquetas);

    if (searchValue === "") {
      return producto;
    }
    if (producto.etiquetas.toLowerCase().includes(searchValue.toLowerCase())) {
      return producto;
    }
  }

  // me falta darle a Productos los props en App.js
  const catalogo = data
    .filter(filterProductsBySearch)
    .map((producto, index) => {
      return (
        <Producto
          index={index}
          imagen={producto.img}
          nombre={producto.nombre}
          descripcion={producto.descripcion}
          tipo={producto.tipo}
          precio={producto.precio}
          entrega={producto.entrega}
          autor={producto.autor}
          stock={producto.stock}
          user={props.user}
        />
      );
    });

  function Producto(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (props.user) {
      //aqui funcionalidad registrado
      return (
        <>
          <Card
            /* className="card" */ key={props.index}
            style={{ width: "18rem", height:"auto" }}
          >
            <Card.Img variant="top" src={props.imagen} width="250" height="250" />
            <Card.Body>
              <Card.Title>{props.nombre}</Card.Title>
              <Card.Text>{props.descripcion}</Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>Precio: {props.precio}€</ListGroup.Item>
                <ListGroup.Item>Entrega en {props.entrega}</ListGroup.Item>
              </ListGroup>
              <Button className="mt-2"id="boton" onClick={handleShow}>
                ¡Lo quiero!
              </Button>
            </Card.Body>
          </Card>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>
                <p class="fs-3">Contacta con el artista.</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body><Alert variant="success">{props.autor}</Alert></Modal.Body>
            <Modal.Footer>
              <Button id="botonnav"variant="secondary" onClick={handleClose}>
                ¡Hecho!
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    } else {
      //aqui sin registrar
      return (
        <>

          <Card
            /* className="card" */ key={props.index}
            style={{ width: "18rem" }}
          >
            <Card.Img variant="top" src={props.imagen} />
            <Card.Body>
              <Card.Title>{props.nombre}</Card.Title>
              <Card.Text>{props.descripcion}</Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>Precio: {props.precio}€</ListGroup.Item>
                <ListGroup.Item>Entrega en {props.entrega}</ListGroup.Item>
              </ListGroup>
              <Button id="botonnav" onClick={handleShow}>
                ¡Lo quiero!
              </Button>
            </Card.Body>
          </Card>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Inicia sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Inicia sesión para ponerte en contacto con el artista.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Link to="/login">
                <Button variant="primary" onClick={handleClose}>
                  Iniciar sesión
                </Button>
              </Link>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

  return (
    <>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Encuentra lo que estabas buscando</h1>
            <p class="lead text-muted">
              Busca por nombre o por tipo de producto o servicio. Por ejemplo, puedes escribir "cerámica" o "tatuaje pequeño"
            </p>
          </div>
          <div className="listComponentcontainer">
            <label htmlFor="search">
              <input
                type="text"
                id="search"
                data-testid="list-search-input"
                placeholder="¿Qué estás buscando?"
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <em className="fas fa-search" />
            </label>
          </div>
        </div>
      </section>
      <div class="album py-5 bg-light">
    <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {catalogo}
        </div>
        </div>
  </div>  
    </>
  );
}

export default Productos;


