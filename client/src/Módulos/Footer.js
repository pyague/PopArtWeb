import {Container, Row, Col, Jumbotron } from "react-bootstrap"

function Footer(){
    return (
      <Jumbotron id="footer">
        
        <div class="row">
          <div class="col-12 col-md">
            
            <small class="d-block mb-3 text-muted">&copy; 2021-Pablo Yagüe González</small>
          </div>
          <div class="d-flex pe-5 ps-5">
          <div class="col-4 col-md">
            <p class="fs-5">Trabaja con nosotros</p>
            <ul class="list-unstyled">
              <li class="fs-6"><a class="link-secondary" href="#">Vacantes</a></li>
              <li class="fs-6"><a class="link-secondary" href="#">Entorno diverso</a></li>
              <li class="fs-6"><a class="link-secondary" href="#">Futuro en PopArt</a></li>
            </ul>
          </div>
          <div class="col-4 col-md">
            <p class="fs-5">Secciones</p>
            <ul class="list-unstyled">
              <li class="fs-6"><a class="link-secondary" href="#">Productos</a></li>
              <li class="fs-6"><a class="link-secondary" href="#">FAQs</a></li>
            </ul>
          </div>
          <div class="col-4 col-md">
            <p class="fs-5">Contacta con nosotros</p>
            <ul class="list-unstyled">
                  <li class="fs-6"><b>Dirección:</b> Santiago Ruiz 2, 2D</li>
                  <li class="fs-6"><b>Email:</b> info@popart.com</li>
                  <li class="fs-6"><b>Tf:</b> 900211032</li>
                  <li class="fs-6"><b>Horario</b>L-V: 09h-18h</li>
                  
              </ul>
          </div>
          </div>
        </div>
      
      </Jumbotron>
    )
}

export default Footer;