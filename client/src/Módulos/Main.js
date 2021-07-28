import { useState, useEffect } from "react";
import { Row, Col, List, Carousel, Container, Card, ListGroup, Button, Jumbotron } from "react-bootstrap";
import Productos from "./Productos";
import Areapersonal from "./Areapersonal";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Main(props) {
  const[data, setData]=useState([])
  const[loading, setLoading]=useState()


  let random1=Math.floor(Math.random() *13)
  let random2=Math.floor(Math.random() *13)
  let random3=Math.floor(Math.random() *13)
  let random4=Math.floor(Math.random() *13)

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
      
      const catalogo = data.map((producto, index) => {
      return (
        <ProductoIndex
          index={index}
          imagen={producto.img}
          nombre={producto.nombre}
          descripcion={producto.descripcion}
          tipo={producto.tipo}
          precio={producto.precio}
          entrega={producto.entrega}
          autor={props.username}
          stock={producto.stock}
          user={props.user}
        />
      );
    });
    
    
    function ProductoIndex(props) {
        return (
            <>
              <Card
                /* className="card" */ key={props.index}
                style={{ width: "18rem" }}>
                <Card.Img variant="top" width="350px" height="250px" src={props.imagen} />
                <Card.Body>
                  <Card.Title>{props.nombre}</Card.Title>
                  <Card.Text>{props.descripcion}</Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Precio: {props.precio}€</ListGroup.Item>
                    <ListGroup.Item>Entrega en <b>{props.entrega}</b></ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              
            </>
          );
        }

    
    return (
    <>
    <Jumbotron className=" mt-1 mb-4" id="jumbotronmain">
      <Container>
        <Row>
        <Col className="p-5">
  <p class="fs-1 fw-normal  p-1">Encuentra lo que estabas buscando</p>
  <p class="fw-lighter fs-3 text-grey ">
  ¿Buscas un cuadro o una ilustración?¿Tal vez algo de cerámica?¿Tu próximo tatuaje?
  </p>
  <p class="fw-lighter fs-3 text-grey ">
    Encuentralo todo aqui
  </p>
  <p class="">
    <Link to="/productos">
    <Button id="botonnav" variant="light">Buscar productos</Button>
    </Link>
  </p>
  
  </Col>
  </Row>
  </Container>
</Jumbotron>
    <Container>
      
  <Row className="d-flex flex-row">
        {catalogo[random1]}
        {catalogo[random2]}
        {catalogo[random3]}
        {catalogo[random4]}
  </Row>
  </Container>
  <Jumbotron className="mt-4 mb-4" id="jumbotronmain">
      <Container>
        <Row>
        <Col className="p-5">
  <p class="fs-1 fw-normal text-grey p-1">¿Eres artista?</p>
  <p class="fw-lighter fs-3 text-grey p-1">
  Si eres artista este es tu lugar perfecto para encontrar a consumidores del arte más emergente y local. Regístrate y comienza ya a subir tus productos o servicios a la web.
  </p>
  <p class="p-1">
    <Link to="/registro">
    <Button id="botonnav" variant="light">Regístrate</Button>
    </Link>
  </p>
  </Col>
  </Row>
  </Container>
</Jumbotron>
<div class="mt-5 mb-5 container marketing">

    
    <div class="row">
      <div class="col-lg-4 text-center">
        <img id="imgborder" class="bd-placeholder-img rounded-circle border-2" width="140" height="140" src="https://i.ibb.co/j6XX62T/pexels-anna-shvets-5642023.jpg"  aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"></img>

        <p class="fw-normal fs-3">Variedad</p>
        <p class="fw-lighter fs-5">Cerámica, tatuajes, ilustraciones, productos textiles, complementos...</p>
        
      </div>
      <div class="col-lg-4 text-center">
      <img class="bd-placeholder-img rounded-circle" width="140" height="140" src="https://i.ibb.co/tJW3jm1/pexels-ingo-joseph-35969.jpg"  aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"></img>
        <p class="fw-normal fs-3">Cercanía</p>
        <p class="fw-lighter fs-5">Busca los prodcutos por localidad.</p>
        
      </div>
      <div class="col-lg-4 text-center">
      <img class="bd-placeholder-img rounded-circle" width="140" height="140" src="https://i.ibb.co/Np2tQcV/pexels-anthony-shkraba-4348192.jpg"  aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"></img>
        <p class="fw-normal fs-3">Originalidad</p>
        <p class="fw-lighter fs-5">Todos los productos son artesanales. La originalidad, está aquí.</p>
        
      </div>
    </div>
    </div>
    </>
    
  );
}

export default Main;
