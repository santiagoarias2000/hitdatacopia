import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";

import { useState } from "react";
import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utilities/domains/ApiBack";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";
import { useForm } from "../../../utilities/hooks/useForm";
import Vehicle from "../../../models/Vehicle";
import { useNavigate } from "react-router-dom";

export const CreateVehicle = () => {
  // Variables
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const navegation = useNavigate();
  let { typeVehicle, licensePlate, expirationSoat, expirationTecnomechanic,doubleLink, object } = useForm<Vehicle>(
    new Vehicle("","","","","")
  );
  // *******************************************************************

  // Función flecha para limpiar cajas
  const limpiarCajas = (formulario: HTMLFormElement) => {
    formulario.reset();

    object.typeVehicle = "";
    object.licensePlate = "";
    object.expirationSoat = "";
    object.expirationTecnomechanic = "";

    formulario.typeVehicle.value = "";
    formulario.licensePlate.value = "";
    formulario.expirationSoat.value = "";
    formulario.expirationTecnomechanic.value = "";

    formulario.classList.remove("was-validated");
  };

  // Crear el vehículo
  // *******************************************************************
  const enviarFormulario = async (fh: formaHtml) => {
    fh.preventDefault();
    setEnProceso(true);
    const formulario = fh.currentTarget;
    formulario.classList.add("was-validated");

    if (formulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      const resultado = await ServicePrivate.requestPOST(
        ApiBack.CREATE_VEHICLE,
        object
      );
      console.log(resultado);
      if (resultado.OK) {
        
        setEnProceso(false);
        MessageToastify("success", "Vehículo creado", 7000);
      } else {
        MessageToastify("error", "ERROR. El vehículo ya esta creado.", 7000);
      }
      limpiarCajas(formulario);
      
    }
  };

  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Vehículos</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/home">Inicio</a>
            </li>
            <li className="breadcrumb-item active">Crear vehículo</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de formulario: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Formulario de creación</h5>

            <Form noValidate validated={enProceso} onSubmit={enviarFormulario}>
              <Form.Group as={Row} className="mb-3" controlId="typeVehicle">
                <Form.Label column sm={2}>
                  Tipo Vehículo
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="text"
                    name="typeVehicle"
                    className="form-control"
                    value={typeVehicle}
                    onChange={doubleLink}
                  />
                  <Form.Control.Feedback type="invalid">
                    Tipo de vehiculo es obligatorio
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="licensePlate">
                <Form.Label column sm={2}>
                  Placa
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="text"
                    name="licensePlate"
                    className="form-control"
                    value={licensePlate}
                    onChange={doubleLink}
                  />
                  <Form.Control.Feedback type="invalid">
                    Placa es obligatorio
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="expirationSoat">
                <Form.Label column sm={2}>
                  Vencimiento SOAT:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="date"
                    name="expirationSoat"
                    placeholder="Ingrese el vencimiento SOAT(DD/MM/AAAA):"
                    className="form-control"
                    value={expirationSoat}
                    onChange={doubleLink}
                  />
                  <Form.Control.Feedback type="invalid">
                    Vencimiento SOAT, es obligatorio
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="expirationTecnomechanic">
                <Form.Label column sm={2}>
                  Vencimiento Tecnomecanica
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="date"
                    name="expirationTecnomechanic"
                    className="form-control"
                    value={expirationTecnomechanic}
                    onChange={doubleLink}
                  />
                  <Form.Control.Feedback type="invalid">
                    Vencimiento de la tecnomecanica es obligatorio
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit" className="btn2 btn-info btn-sm">Crear Vehículo</Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      {/* Ejemplo de formulario: Inicio */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}
    </main>
  );
};
