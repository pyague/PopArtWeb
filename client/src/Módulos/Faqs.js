import { Container, Row, Col, Image } from "react-bootstrap";

function Faqs() {
  return (
    <main>
      <section class="container text-start">
        <Row>
          <p class="p-5 fs-1 fw-normal text-center text-success">
            ¿Cómo funciona ArtPop?
          </p>
        </Row>
        <Row className="justify-content-evenly">
          <Col xs={10} md={4}>
            <div class="rounded-3 p-5 align-items-center">
              <p class="fs-3 p-2">1. Explora</p>
              <p class="fs-5 p-2 fw-light">
                Busca en el buscador el producto que deseas. Para encontrarlo
                puedes escribir su nombre, el material del que está hecho, los
                colores que tiene, etc. En la descripción te aparecerá el área
                donde está disponible.
              </p>
            </div>
          </Col>
          <Col xs={2} md={4}>
            <img
              src="https://i.ibb.co/ZzdF3hB/busqueda.jpg"
              width="auto"
              alt="Busqueda"
              class="img-fluid rounded-5 p-5"
            />
          </Col>
        </Row>

        <Row className="justify-content-evenly">
          
          <Col xs={10} md={4}>
            <div class="container p-5  rounded-3">
              <p class="fs-3 p-2">2. Encuentra tus artistas favoritos </p>
              <p class="fs-5 p-2 fw-light">
                Encuentra los artistas que te gustan, también puedes buscar por su nombre para que te aparezcan sus productos.
              </p>
            </div>
          </Col>
          <Col xs={2}md={4}>
            <img
              src="https://i.ibb.co/f1F9pnc/favoritos.jpg"
              width="auto"
              alt="favoritos"
              class="img-fluid rounded-3 p-5"
            />
          </Col>
        </Row>

        <Row className="justify-content-evenly">
          <Col xs={10} md={4}>
            <div class="p-5 rounded-3">
              <p class="fs-3 p-2">3. Entra en contacto con el artista.</p>
              <p class="fs-5 p-2 fw-light">
                Cuando encuentres lo que buscas entra en contacto con el artista
                para recibir el producto o ampliar más información acerca de el.
              </p>
            </div>
          </Col>
          <Col xs={2} md={4}>
            <img
              src="https://i.ibb.co/xzWpmfh/contacto.jpg"
              alt="contacto"
              class="img-fluid rounded-3 p-5"
            />
          </Col>
        </Row>
      </section>
    </main>
  );
}

export default Faqs;
