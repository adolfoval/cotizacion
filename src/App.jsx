//Librerias 
import React, { useState } from "react";
import FormCotisation from "./components/FormCotisation";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button"
import { OffcanvasBody } from "react-bootstrap";

//Estilos
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"


const Offcanv = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow} className="mx-auto d-block mt-5 fs-3 fw-light">
        ¡Cotiza la tuya!
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" scroll={true} backdrop= {true}>
      <Offcanvas.Header closeButton>
      </Offcanvas.Header>
      <OffcanvasBody>
        <FormCotisation />
      </OffcanvasBody>

    </Offcanvas>
    </>
  )
}


const App = () => {
  return (

    <>
      <Offcanv />
    </>

  )
}

export default App
