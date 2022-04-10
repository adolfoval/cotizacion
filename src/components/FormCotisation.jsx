import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FormCotisation = () => {

    const [datosForm, actuDatos] = useState();
    const [checkboxTerminos, actuCheckboxTerminos] = useState(false);
    const [alertTerminos, actuAlertTerminos] = useState(false);
    const [selectDepartamento, actuSelectDepartamento] = useState("Antoquia");
    const [ciudad, actuCiudad] = useState();
    const [selectCiudad, actuSelectCiudad] = useState();
    const [errors, setErrors] = useState("");

    useEffect(() => {
        /* Carga de los municipios en el formulario */
        fetch(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${selectDepartamento.departamento}`)
            .then(response => response.json())
            .then(data => data.map(departament => {
                actuCiudad({ data })
            }));
    }, [selectDepartamento]);

    const handleCiudad = (event) => {
        actuSelectCiudad({
            [event.target.name]: event.target.value,
        }
        );
    }

    const handleDepartamento = (event) => {
        /* Funcion para obtener el departamento seleccionado */
        actuSelectDepartamento({
            [event.target.name]: event.target.value,
        });
    };

    const handleTerminos = () => {
        /* Funcion para saber si el checkbox de terminos esta seleccionado */
        actuCheckboxTerminos(!checkboxTerminos);
    };

    const hadleInputs = (event) => {
        /* Funcion que almacena los datos de los diferentes inputs del formulario */
        actuDatos({
            ...datosForm,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        let data = {};
        /*Funcion para manejar el envio de los datos del formulario */
        event.preventDefault();
        if (!checkboxTerminos) {
            actuAlertTerminos(true);
        } else {
            actuAlertTerminos(false);
        }
        if (ciudad && checkboxTerminos && datosForm && selectCiudad) {

            data = {
                ...datosForm,
                ...selectDepartamento,
                ...selectCiudad,
            }
            //console.log(data);
            fetch('http://127.0.0.1:8000/api/cotizacion/crear', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(data)
            }).then(async response => {
                if (!response.ok) {
                    const validation = await response.json();
                    setErrors(validation.errors);
                    console.log(validation.errors);
                } else {
                    console.log("Success")
                }
            });

            fetch('http://127.0.0.1:8000/api/cotizacion/mail', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(data)
            }).then(async response=>{
                const validation = await response.json();
                console.log(validation);
            });
        } else{
            return
        }
    };

    return (
        <Card className="text-center">
            <Card.Header>Cotización</Card.Header>
            <Card.Body>
                <form>
                    <div className="form-floating mb-3 form-control-sm">
                        <select className="form-select" id="floatingSelect"
                            name="modelo" onChange={hadleInputs}
                        >
                            <option value={false}>----</option>
                            <option value="rextonG4">Rexton G4</option>
                            <option value="rextonSports">Rexton Sports</option>
                            <option value="tivoli">Tivoli</option>
                            <option value="korando">Korando</option>
                            <option value="xlv">XLV</option>
                        </select>
                        <label htmlFor="floatingSelect">Selecciona un modelo</label>
                    </div>

                    <div className="form-floating mb-3 form-control-sm">
                        <input type="text" className="form-control"
                            name="nombre" id="floatingNombre" placeholder="Ingrese el nombre"
                            onChange={hadleInputs}
                        />
                        <label htmlFor="flotingNombrel">Nombre completo</label>
                    </div>

                    <div className="form-floating mb-3 form-control-sm">
                        <input type="email" className="form-control"
                            name="email" id="floatingEmail" placeholder="Ingrese un correo"
                            onChange={hadleInputs}
                        />
                        <label htmlFor="floatingEmail">Email</label>
                    </div>

                    <div className="form-floating mb-3 form-control-sm">
                        <input type="text" className="form-control" name="celular"
                            id="floatingTelefono" placeholder="Ingrese un telefono"
                            onChange={hadleInputs}
                        />
                        <label htmlFor="floatingEmail">Número celular</label>
                    </div>

                    <Row className="mb-3">
                        <Col>
                            <div className="form-floating mb-3 form-control-sm">
                                <select className="form-select" id="foatingDepartamento"
                                    name="departamento" onChange={handleDepartamento}
                                >
                                    <option defaultChecked>-</option>
                                    <option value="Valle del Cauca">Valle del cauca</option>
                                    <option value="Antioquia">Antioquia</option>
                                    <option value="Bogotá D.C.">Bogotá D.C.</option>
                                </select>
                                <label htmlFor="floatingDepartamento">Departamento</label>
                            </div>
                        </Col>
                        <Col>
                            {
                                ciudad ?
                                    <div className="form-floating mb-3 form-control-sm">
                                        <select className="form-select" name="ciudad"
                                            id="floatingCiudad" onChange={handleCiudad}
                                        >
                                            <option value="0">----</option>
                                            {
                                                ciudad.data.map((ciu, index) => (

                                                    <option key={index} value={ciu.municipio}>{ciu.municipio}</option>

                                                ))
                                            }
                                        </select>
                                        <label htmlFor="floatingCiudad">Ciudad</label>
                                    </div>
                                    :
                                    <></>
                            }

                        </Col>
                    </Row>

                    <div className="form-check mb-3 form-control-sm">
                        <input className="form-check-input" type="checkbox" name="terminos"
                            id="flexCheckDefault" onChange={handleTerminos}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Acepto la politica de
                            <a target="_blank" rel="noreferrer"
                                href="https://rb.gy/9hbxqp"> Tratamiento de Datos Personales
                            </a>
                        </label>
                        {
                            (alertTerminos) ?
                                <div className="alert alert-danger mt-3" display="d-none" role="alert">
                                    Debe aceptar los terminos para continuar
                                </div> : <></>
                        }
                    </div>

                    <button type="submit" className="btn btn-outline-dark" onClick={handleSubmit}>Enviar datos</button>

                </form>
            </Card.Body>
        </Card>
    )
}

export default FormCotisation