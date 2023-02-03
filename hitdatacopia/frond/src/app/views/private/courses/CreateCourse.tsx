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
import Course from "../../../models/Course";
import { Link, useNavigate } from "react-router-dom";

export const CreateCourse = () => {
  // Variables
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const navegation = useNavigate();
  let { typeCourse, timeCourse, price, doubleLink, object } = useForm<Course>(
    new Course("", "", "", 0)
  );
  // *******************************************************************

  // Función flecha para limpiar cajas
  const limpiarCajas = (formulario: HTMLFormElement) => {
    formulario.reset();

    object.typeCourse = "";
    object.timeCourse = "";
    object.price = 0;

    formulario.typeCourse.value = "";
    formulario.timeCourse.value = "";
    formulario.price.value = 0;

    formulario.classList.remove("was-validated");
  };

  // Crear el perfil
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
        ApiBack.CREATE_COURSE,
        object
      );
      if (resultado.OK) {
        setEnProceso(false);
        MessageToastify("success", "Curso creado", 7000);
      } else {
        MessageToastify("error", "ERROR. El curso ya esta creado.", 7000);
      }
      
      limpiarCajas(formulario);
    }
  };

  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Cursos</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/home">Inicio</a>
            </li>
            <li className="breadcrumb-item active">Crear curso</li>
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
              <Form.Group as={Row} className="mb-3" controlId="typeCourse">
                <Form.Label column sm={2}>
                  Tipo Curso
                </Form.Label>
                <Col sm={10}>
                  <Form.Select
                    required
                    name="typeCourse"
                    value={typeCourse}
                    onChange={doubleLink}
                  >
                    <option value="">Seleccione el Tipo Curso</option>
                    <option value={"A1"}>A1</option>
                    <option value={"A2"}>A2</option>
                    <option value={"B1"}>B1</option>
                    <option value={"C1"}>C1</option>
                    <option value={"C2"}>C2</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Seleccione el Tipo Curso
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="timeCourse">
                <Form.Label column sm={2}>
                  Tiempo Curso
                </Form.Label>
                <Col sm={10}>
                  <Form.Select
                    required
                    name="timeCourse"
                    value={timeCourse}
                    onChange={doubleLink}
                  >
                    <option value="">Seleccione el Tiempo Curso</option>
                    <option value={"3 MESES"}>3 MESES</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Seleccione el Tiempo Curso
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="price">
                <Form.Label column sm={2}>
                  Precio
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="number"
                    name="price"
                    placeholder="Ingrese el precio"
                    className="form-control"
                    value={price}
                    onChange={doubleLink}
                  />
                  <Form.Control.Feedback type="invalid">
                    Precio, es obligatorio
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" className="btn2 btn-info btn-sm">Crear Curso</Button>
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
