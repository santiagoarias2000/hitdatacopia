import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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

export const UserUpdate = () => {
  let { idUser } = useParams();
  const [todoListo, setTodoListo] = useState<boolean>(false);
  let cargaFinalizada = todoListo !== false;
  

  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);

  // *******************************************************************

  let {
    fullName,
    emailUser,
    passwordUser,
    stateUser,
    idProfile,
    dateUser,
    doubleLink,
    object,
  } = useForm<User>(new User("","", "", 0,"", 2,new Date()));

  const enviarFormulario = async (fh: formaHtml) => {
    fh.preventDefault();
    setEnProceso(true);
    const formulario = fh.currentTarget;
    formulario.classList.add("was-validated");

    if (formulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      const urlActualizar = ApiBack.USERS_UPDATE + "/" + idUser;
      //const objetoActualizar = new User(object.idUser,object.fullName,object.emailUser,object.stateUser,object.passwordUser,object.idProfile,new Date());
      const resultado = await ServicePrivate.requestPUT(urlActualizar,object);
      if (resultado.OK) {
        setEnProceso(false);
        MessageToastify("success", "Usuario actualizado correctamente", 6000);
      } else {
        MessageToastify(
          "error",
          "No se puede actualizar el usuario. Es posible que el correo ya exista en la base de datos",
          6000
        );
      }
    }
  };

  const obtenerUnUsuario = async () => {
    const urlCargarUnUsuario = ApiBack.USERS_GIVE_ME_ONE + "/" + idUser;
    const usuRecibido = await ServicePrivate.requestGET(urlCargarUnUsuario);
      object.idUser = usuRecibido.idUser;
      object.fullName = usuRecibido.fullName;
      object.emailUser = usuRecibido.emailUser;
      object.stateUser = usuRecibido.stateUser;
      object.passwordUser = usuRecibido.passwordUser;
      object.idProfile = usuRecibido.idProfile;

      if (usuRecibido) {
        setTodoListo(true);
      }
  };

  // const obtenerPerfiles =async () => {
  //   const 
    
  // }
  

 

  useEffect(() => {
    obtenerUnUsuario();
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Perfiles</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/home/adminuser">Administración de perfiles</Link>
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
                <Form.Group as={Row} className="mb-3" controlId="fullName">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Nombre completo:</small>
                    </span>
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
                    <span className="text-success">
                      <small>Correo electrónico:</small>
                    </span>
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
                    <span className="text-success">
                      <small>Estado usuario:</small>
                    </span>
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
                    <span className="text-success">
                      <small>Contraseña:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="password"
                      name="passwordUser"
                      minLength={6}
                      className="form-control"
                      value={passwordUser}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Contraseña requerida mínimo 4 caracteres
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="passwordUser">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Confirmar Contraseña:</small>
                    </span>
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

                

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 9, offset: 3 }}>
                    <Button type="submit" className="btn btn-primary">
                      Actualizar Usuario
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
      {/* Ejemplo de furmulario: Fin */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
    </main>
  );
};
