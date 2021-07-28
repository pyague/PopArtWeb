import {Jumbotron, Container, Row, Col} from "react-bootstrap"


function Info(){
    return(
<main>
<Jumbotron className="" id="jumbotron1">
      <Container>
        <Row>
        <Col className="p-5">
  <h1 class="fs-2 p-1 fw-normal">¿Qué es PopArt?</h1>
  <p class="fs-4 p-1 fw-lighter">
  Plataforma dedicada a la oferta de productos artísticos y artesanales mediante
    la cual los usuarios interesados pueden ponerse en contacto con los creadores y
    los artistas emergentes para darse a conocer y ofertar sus obras.
  </p>  
  </Col>
  </Row>
  </Container>
</Jumbotron>
<Jumbotron className=" " id="jumbotron0">
      <Container>
        <Row>
        <Col className="p-5 text-end">
  <h1 class=" fs-2 p-1 fw-normal">¿Cómo surgió la idea?</h1>
  <p class="fs-4 p-1 fw-lighter">
  Somos un grupo de amigxs que nos dedicamos a diferentes disciplinas artísticas y creamos diferentes productos. Ante la dificultad de darnos a conocer y decidimos crear esta plataforma con la intención de crear una comunidad en la que poder progresar y darnos a conocer.
  </p>
  
  </Col>
  </Row>
  </Container>
</Jumbotron>
<Jumbotron className="" id="jumbotron1">
      <Container>
        <Row>
        <Col className="p-5 ">
  <h1 class="p-2 fs-2 fw-normal">El futuro de PopArt</h1>
  <p class="fs-4 p-1 fw-lighter">
  Nuestro camino acaba de comenzar. En las próximas actualizaciones de la web incorporaremos nuevas funcionalidades para seguir haciendo crecer esta comunidad y facilitar las comunicaciones entre artistas y compradores.
  </p>
  
  
  </Col>
  </Row>
  </Container>
</Jumbotron>
<Jumbotron className=" " id="jumbotron0">
      <Container>
        <Row>
        <Col className="p-5 text-end">
  <h1 class=" fs-2 p-1 fw-normal">¿Tienes alguna sugerencia?</h1>
  <p class="fs-4 p-1 fw-lighter">
        Si tienes alguna sugerencia para que podamos mejorar la plataforma estamos deseosos de escucharla. Envianos un email a info@popart.com y cuéntanosla.
  </p>
  
  </Col>
  </Row>
  </Container>
</Jumbotron>
</main>
    )
}

export default Info;