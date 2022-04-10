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

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <OffcanvasBody>
          <FormCotisation/>
        </OffcanvasBody>

      </Offcanvas>
    </>
  )
}


const App = () => {
  return (

    // <FormCotisation/>


    // <>
    //   <button size="lg" type="button" databstoggle="offcanvas" databstarget="#offcanvasR"
    //     className="btn btn-outline-dark mx-auto d-block align-middle"
    //     >
    //     ¡Cotiza la tuya!
    //   </button>

    //   <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasR" aria-labelledby="offcanvasRightLabel">
    //     <div className="offcanvas-header">
    //       <h5 id="offcanvasRightLabel">Offcanvas right</h5>
    //       <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    //     </div>
    //     <div className="offcanvas-body">
    //       <FormCotisation/>
    //     </div>
    //   </div>
    // </>

    <>
      <Offcanv />
    </>

  )
}

export default App
