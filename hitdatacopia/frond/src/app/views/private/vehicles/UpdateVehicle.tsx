import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";

import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utilities/domains/ApiBack";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";
import { useForm } from "../../../utilities/hooks/useForm";
import Vehicle from "../../../models/Vehicle";

export const UpdateVehicle = () => {
  // Variables
  let { idVehicle } = useParams();
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [todoListo, setTodoListo] = useState<boolean>(false);
  const navegation = useNavigate();
  let cargaFinalizada = todoListo !== undefined;
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

  // Consultar datos del Vehiculo a modificar
  // *******************************************************************
  const getOneVehicle = async () => {
    const urlCargarUnVehiculo = ApiBack.DETAIL_VEHICLE + "/" + idVehicle;
    const vehicleRecibido = await ServicePrivate.requestGET(urlCargarUnVehiculo);
    object.idVehicle = vehicleRecibido.idVehicle;
    object.typeVehicle = vehicleRecibido.typeVehicle;
    object.licensePlate = vehicleRecibido.licensePlate;
    object.expirationSoat = vehicleRecibido.expirationSoat;
    object.expirationTecnomechanic = vehicleRecibido.expirationTecnomechanic;
    if (vehicleRecibido) {
      setTodoListo(true);
    }
  };
  // *******************************************************************

  // Actualizar el Vehiculo
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
      const urlActualizar = ApiBack.UPDATE_VEHICLE + "/" + object.idVehicle;
      const resultado = await ServicePrivate.requestPUT(
        urlActualizar,
        object
      );

      console.log(resultado);
      if (resultado.OK) {
        setEnProceso(false);
        MessageToastify("success", "Vehículo actualizado", 6000);
      } else {
        MessageToastify(
          "error",
          "No se puede actualizar el Vehículo. Es posible que el nombre ya existe en la base de datos",
          6000
        );
      }
      limpiarCajas(formulario);
      
    }
  };
  // *******************************************************************

  // Hook de react que se usa cuando se renderiza o pinta la página (vista)
  useEffect(() => {
    getOneVehicle();
  }, []);
  // *******************************************************************

  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Vehiculo</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/home/vehicles/adminVehicle">Administración de Vehiculo</Link>
            </li>
            <li className="breadcrumb-item active">Actualizar</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de furmulario: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Formulario de edición</h5>
            {cargaFinalizada ? (
              <Form
                noValidate
                validated={enProceso}
                onSubmit={enviarFormulario}
              >
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
                    type="text"
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
                    type="text"
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
                    <Button type="submit" className="btn2 btn-sm">
                      Actualizar Vehiculo
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <div>Cargando información para la edición</div>
            )}
          </div>
        </div>
      </div>
      {/* Ejemplo de furmulario: Fin */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}
    </main>
  );
};
