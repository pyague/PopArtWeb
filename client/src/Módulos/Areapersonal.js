import { useState, useEffect } from "react";
import {
  Alert,
  Form,
  Row,
  Card,
  ListGroup,
  Button,
  Col,
  Container,
  Modal,
} from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";

function Areapersonal(props) {
  const [nombre, setNombre] = useState("");
  const [img, setImg] = useState("");
  const [tipo, setTipo] = useState("");
  const [stock, setStock] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [etiquetas, setEtiquetas] = useState("");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [precio, setPrecio] = useState("");
  const [entrega, setEntrega] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState();
  const [cargar, setCargar] = useState();
  const [eliminar, setEliminar] = useState();
  const [modificar, setModificar] = useState();
  const[mostrar, setMostrar]=useState()

  function anyadirProducto() {
    let producto = {
      nombre: nombre,
      img: img,
      descripcion: descripcion,
      entrega: entrega,
      tipo: tipo,
      autor: props.username,
      stock: stock,
      etiquetas: etiquetas,
      precio: precio,
    };

    fetch("http://localhost:3001/productos/anyadir", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify(producto),
    })
      .then((res) => res.json())
      .then((datos) => {
        setData(datos);
        console.log(data);
        setNombre("");
        setImg("");
        setTipo("");
        setStock("");
        setDescripcion("");
        setEtiquetas("");
        setData("");
        setPrecio("");
        setEntrega("");
        setFeedback("");
        if (datos.añadido) {
          setFeedback(
            <Alert variant="primary">Producto añadido correctamente</Alert>
          );
        } else {
          setFeedback(
            <Alert variant="danger">Error al registrar el producto</Alert>
          );
        }
        console.log(datos);
        mostrar?setMostrar(false):setMostrar(false)
      });
  }

  //--------------------------------------------------------------------------------------------------

  useEffect(() => {
    console.log(props.username);
    setLoading(true);
    fetch("http://localhost:3001/productos/mostrar/personal", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({ autor: props.username }),
    })
      .then((results) => results.json())
      .then((datos) => {
        setData2(datos.datos); //la info que nos llega de la API y la guardamos en el estado
        setLoading(false);
        console.log(datos.datos);
      });
  }, [eliminar, modificar, mostrar]);

  ////---------------ELIMINAR PRODUCTO------------------------------

  function eliminarProducto(id) {
    fetch("http://localhost:3001/productos/eliminar", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((datos) => {
        console.log(datos);
        setEliminar(datos.datos);

        if (datos.eliminado) {
          setFeedback(<Alert variant="primary">Eliminado correctamente</Alert>);
        } else {
          setFeedback(
            <Alert variant="danger">No se ha eliminado correctamente</Alert>
          );
        }
        cargar ? setCargar(false) : setCargar(true);
      });
  }

  //------------MODIFICAR PRODUCTO------------------------------------------
  

  //-------------------MOSTRAR PRODUCTOS---------------------------------------------

  const catalogo = data2.map((producto, index) => {
    return (
      <ProductoPersonal
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
        id={producto._id}
        etiquetas={producto.etiquetas}
      />
    );
  });

  function ProductoPersonal(props) {
    const [nombre2, setNombre2] = useState(props.nombre);
    const [img2, setImg2] = useState(props.imagen);
    const [precio2, setPrecio2] = useState(props.precio);
    const [entrega2, setEntrega2] = useState(props.entrega);
    const [descripcion2, setDescripcion2] = useState(props.descripcion);
    const [etiquetas2, setEtiquetas2] = useState(props.etiquetas);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function modificarProducto(id) {
        let productoModificar = {
          nombre: nombre2,
          img: img2,
          descripcion: descripcion2,
          entrega: entrega2,
          etiquetas: etiquetas2,
          precio: precio2,
          _id: id,
        };
        fetch("http://localhost:3001/productos/modificar", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/Json",
          },
          body: JSON.stringify(productoModificar),
        })
          .then((res) => res.json())
          .then((datos) => {
            console.log(datos);
            setModificar(datos.datos);
    
            if (datos.modificado) {
              setFeedback(
                <Alert variant="primary">Modificado correctamente</Alert>
              );
            } else {
              setFeedback(
                <Alert variant="danger">No se ha modificado correctamente</Alert>
              );
            }
            cargar ? setCargar(false) : setCargar(true);
          });
      }

    return (
      <>
        <Card key={props.index} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={props.imagen} />
          <Card.Body>
            <Card.Title>{props.nombre}</Card.Title>
            <Card.Text>{props.descripcion}</Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item>Precio: {props.precio}</ListGroup.Item>
              <ListGroup.Item>Stock: {props.stock}</ListGroup.Item>
              <ListGroup.Item>Entrega: {props.entrega}</ListGroup.Item>
            </ListGroup>
            <Button variant="danger" onClick={() => eliminarProducto(props.id)}>
              Eliminar
            </Button>
            <Button id="botonnav" variant="primary" onClick={handleShow}>
              Modificar
            </Button>
          </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica el producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nombre del producto</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setNombre2(e.target.value)}
                  value={nombre2}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setImg2(e.target.value)}
                  value={img2}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setDescripcion2(e.target.value)}
                  value={descripcion2}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Entrega</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setEntrega2(e.target.value)}
                  value={entrega2}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Ex.: Cerámica, Arte, Jarrón"
                  onChange={(e) => setPrecio2(e.target.value)}
                  value={precio2}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Etiquetas</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Ex.: Cerámica, Arte, Jarrón"
                  onChange={(e) => setEtiquetas2(e.target.value)}
                  value={etiquetas2}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              id="botonnav" variant="secondary"
              onClick={(handleClose, () => modificarProducto(props.id))}
            >
              Modificar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  //-------------------RENDERIZADO---------------------------------------------

  if (props.user) {
    if (props.artist) {
      return (
        <BrowserRouter>
          <Container>
            <Row>
              <Col sm={6} md={8}>
                <p class="pt-5 fs-4">Tus productos:</p>
                <div class="d-flex align-content-start flex-wrap">{catalogo}</div></Col>
              <Col sm={6} md={4}>
                <p class="pt-5 fs-4">Sube tus nuevos productos</p>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nombre del producto</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setNombre(e.target.value)}
                      value={nombre}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setImg(e.target.value)}
                      value={img}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={(e) => setDescripcion(e.target.value)}
                      value={descripcion}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>¿Es un producto o un servicio?</Form.Label>
                    {["radio"].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Producto"
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                          onChange={(e) => setTipo("producto")}
                        />
                        <Form.Check
                          inline
                          label="Servicio"
                          name="group1"
                          type={type}
                          id={`inline-${type}-2`}
                          onChange={(e) => setTipo("servicio")}
                        />
                      </div>
                    ))}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setPrecio(e.target.value)}
                      value={precio}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      ¿Dónde se entrega o realiza el producto/servicio?
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setEntrega(e.target.value)}
                      value={entrega}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Stock disponible:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setStock(e.target.value)}
                      value={stock}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Etiquetas</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Ex.: Cerámica, Arte, Jarrón"
                      onChange={(e) => setEtiquetas(e.target.value)}
                      value={etiquetas}
                    />
                  </Form.Group>
                  <Link to="/areapersonal" onClick={() => anyadirProducto()}>
                    <Button id="botonnav" variant="primary">Añadir</Button>
                  </Link>

                  <Row>⠀{feedback}</Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </BrowserRouter>
      );
    } else {
      return;
    }
  } else {
    return;
  }
}

export default Areapersonal;
