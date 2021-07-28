import { Container, Row, Col, Image } from "react-bootstrap";

function Funcionamiento() {
  return (
    <main>
      <Container>
        <Row>
          <p id="artistas" class="p-4 fs-1 fw-normal text-center">
            ¿Cómo funciona ArtPop para los artistas?
          </p>
        </Row>
        <Row className="p-3 justify-content-evenly">
        <Col xs={12} md={4}>
            <div class="align-items-center">
            <p id="artistas" class="fs-3 p-2">1. Sube tus productos</p>
            </div>
        </Col>
        <Col xs={12} md={4}>
            <div class="align-items-center">
            <p id="artistas" class="fs-3 p-2">2. Modifica tus productos</p>
            </div>
        </Col>
        <Col xs={12} md={4}>
            <div class="align-items-center">
            <p id="artistas" class="fs-3 p-2">3. Elimina tus productos.</p>
            </div>
        </Col>
        </Row>
        <Row className="p-3 justify-content-evenly">
          <Col xs={12} md={4}>
            <div class=" align-items-center">
              <p class="fs-6 p-2 fw-light">
                Sube tus productos a la web. Tu decides el precio y el lugar en el que vendes el producto o realizas el servicio. <b>Asegúrate de etiquetar bien el producto</b> para los usuarios puedan encontrarlo más facilmente. ¡Pon todas las etiquetas que quieras!
              </p>
            </div>
          </Col>
    
          
          <Col xs={12} md={4}>
            <div class=" rounded-3">
              <p class="fs-6 p-2 fw-light">
                En tu área personal puedes modificar tus productos <b>tantas veces como quieras.</b> Cambiar la imágen, el título, la descripción o el precio. Todo fácil y sencillo.
              </p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div class="rounded-3">
              
              <p class="fs-6 p-2 fw-light">
                Cuando te quedes sin stock de tus productos, <b>puedes eliminarlos fácilmente en tu área personal</b> Seguro que rápidamente te quedas sin stock asi que estate atentx para no crear falsas ilusiones a futuros compradores.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
            <Col md={4}>
            <img src="" alt=""/>
            </Col>
            <Col md={4}>
            <img src="" alt=""/>
            </Col>
            <Col md={4}>
            <img src="" alt=""/>
            </Col>
        </Row>
    </Container>

    </main>
  );
}

export default Funcionamiento;
