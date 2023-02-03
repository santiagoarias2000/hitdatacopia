import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import * as cifrado from "js-sha512";
import { ToastContainer } from "react-toastify";

import User from "../../../models/User";
import { useForm } from "../../../utilities/hooks/useForm";
import ApiBack from "../../../utilities/domains/ApiBack";
import ServicePrivate from "../../../services/ServicePrivate";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";
import Profile from "../../../models/Profile";

export const UserCreate = () => {
  const [todoListo, setTodoListo] = useState<boolean>(false);
  let cargaFinalizada = todoListo !== false;

  const redirigir = useNavigate();

  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  // *******************************************************************

  // Hook para formulario
  let {
    fullName,
    emailUser,
    passwordUser,
    stateUser,
    doubleLink,
    object,
  } = useForm<User>(new User("","", "", 0,"", 2,new Date()));
  // *******************************************************************

  const obtenerPerfiles = async () => {
    // const resultado = await ServicePrivate.requestGET( ApiBack.URL_PERFILES_OBTENER );
    // setArregloPerfiles(resultado);
    setTodoListo(true); 
  };
  // Función flecha para limpiar cajas
  const limpiarCajas = (formulario: HTMLFormElement) => {
    object.idUser = "";
    object.passwordUser = "";
    formulario.passwordUser.value = "";
    formulario.repasswordUser.value = "";
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
      const objetoActualizar = new User(object.idUser,object.fullName,object.emailUser,object.stateUser,object.passwordUser,object.idProfile,new Date());
      const respuesta = await ServicePrivate.requestPOST(
        ApiBack.USERS_CREATE,
        objetoActualizar
      );
      console.log(respuesta);

      if (respuesta.answer) {
        setEnProceso(false);
        redirigir("/home/listusers/");
      } else {
        limpiarCajas(formulario);
        MessageToastify(
          "error",
          "No se puede crear el usuario. Es posible que el correo exista en la BD",
          7000
        );
      }
    }
  };
  // *******************************************************************

  // Hook que carga información al renderizar la página
  useEffect(() => {
    obtenerPerfiles();
  }, []);
  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Usuarios</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/home">Inicio</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/home/adminuser">Administración de usuarios</a>
            </li>
            <li className="breadcrumb-item active">Crear usuario</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de formulario: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Formulario de creación</h5>

            {cargaFinalizada ? (
              <Form
                noValidate
                validated={enProceso}
                onSubmit={enviarFormulario}
              >
                <Form.Group as={Row} className="mb-3" controlId="fullName">
                  <Form.Label column sm={3}>
                    Nombre completo:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="fullName"
                      className="form-control"
                      value={fullName}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Nombre completo del usuario
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="emailUser">
                  <Form.Label column sm={3}>
                    Correo electrónico:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="emailUser"
                      className="form-control"
                      pattern="[a-z0-9+_.-]+@[a-z]+\.[a-z]{2,3}"
                      value={emailUser}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Correo inválido
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="stateUser">
                  <Form.Label column sm={3}>
                    Estado usuario:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="stateUser"
                      value={stateUser}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione el estado</option>
                      <option value={1}>Activo</option>
                      <option value={2}>Inactivo</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el estado inicial del usuario
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                

                <Form.Group as={Row} className="mb-3" controlId="passwordUser">
                  <Form.Label column sm={3}>
                    Contraseña:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="password"
                      name="passwordUser"
                      minLength={4}
                      className="form-control"
                      value={passwordUser}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Contraseña requerida mínimo 4 caracteres
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="repasswordUser"
                >
                  <Form.Label column sm={3}>
                    Confirmar contraseña:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="password"
                      name="repasswordUser"
                      minLength={4}
                      className="form-control"
                      pattern={passwordUser}
                    />
                    <Form.Control.Feedback type="invalid">
                      Contraseña no coincide con la anterior
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 9, offset: 3 }}>
                    <Button type="submit" className="btn2 btn-primary">
                      Crear Usuario
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <div>Cargando información de los perfiles</div>
            )}
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
