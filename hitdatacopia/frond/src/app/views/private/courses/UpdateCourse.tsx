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
import Course from "../../../models/Course";

export const UpdateCourse = () => {
  // Variables
  let { idCourse } = useParams();
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [todoListo, setTodoListo] = useState<boolean>(false);
  const navegation = useNavigate();
  let cargaFinalizada = todoListo !== undefined;
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

  // Consultar datos del Curso a modificar
  // *******************************************************************
  const getOneCourse = async () => {
    const urlCargarUnCurso = ApiBack.DETAIL_COURSE + "/" + idCourse;
    console.log(urlCargarUnCurso);
    const CourseRecibido = await ServicePrivate.requestGET(urlCargarUnCurso);
    object.idCourse = CourseRecibido.idCourse;
    object.typeCourse = CourseRecibido.typeCourse;
    object.timeCourse = CourseRecibido.timeCourse;
    object.price = CourseRecibido.price;
    if (CourseRecibido) {
      setTodoListo(true);
    }
  };
  // *******************************************************************

  // Actualizar el Curso
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
      const urlActualizar = ApiBack.UPDATE_COURSE + "/" + object.idCourse;
      const resultado = await ServicePrivate.requestPUT(urlActualizar, object);

      if (resultado.OK) {
        setEnProceso(false);
        MessageToastify("success", "Curso actualizado", 6000);
      } else {
        MessageToastify(
          "error", "ERROR. El curso ya esta creado.", 7000
        );
      }
      
      limpiarCajas(formulario);
      
    }
  };
  // *******************************************************************

  // Hook de react que se usa cuando se renderiza o pinta la página (vista)
  useEffect(() => {
    getOneCourse();
  }, []);
  // *******************************************************************

  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Curso</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/home/courses/adminCourse">Administración de Curso</Link>
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
                      <Button type="submit" className="btn2 btn-sm">
                        Actualizar Curso
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
