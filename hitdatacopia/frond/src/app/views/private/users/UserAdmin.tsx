import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Profile from "../../../models/Profile";
import User from "../../../models/User";
import Vehicle from "../../../models/Vehicle";
import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utilities/domains/ApiBack";
import { getLocalDate } from "../../../utilities/functions/DateFormat";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";

export const UserAdmin = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [arregloPerfiles, setArregloPerfiles] = useState<User[]>([]);
  const [objPer, setObjPer] = useState<User>(
    new User("","", "", 0,"", 2,new Date())
  );

  const obtenerPerfiles = async () => {
    const resultado = await ServicePrivate.requestGET(ApiBack.USERS_LIST);
    setArregloPerfiles(resultado);
    return resultado;
  };
  const borrarPerfil = async (idUser: string) => {
    const urlBorrar = ApiBack.USERS_DELETE + "/" + idUser;
    const resultado = await ServicePrivate.requestDELETE(urlBorrar);
    console.log(resultado);
    if (typeof resultado.OK === "undefined") {
      MessageToastify(
        "error",
        "No se puede crear eliminar el perfil.",
        6000
      );
    } else {
      MessageToastify("success", "Perfil eliminado", 6000);
    }
    obtenerPerfiles();
  };
  useEffect(() => {
    obtenerPerfiles();
  }, []);
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Usuarios Admin</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/home">Inicio</a>
            </li>
            <li className="breadcrumb-item active">
              Administración de Usuarios Admin
            </li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejempplo de una tabla para presentación de datos: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead className="text-center align-middle">
                <tr>
                  <th style={{ width: "15%" }}>Orden</th>
                  <th style={{ width: "40%" }}>Nombre perfil</th>
                  <th style={{ width: "25%" }}>Estado</th>
                  <th
                    className="text-center align-middle"
                    style={{ width: "10%" }}
                  ></th>
                </tr>
              </thead>

              <tbody className="text-center align-middle">
                {arregloPerfiles.map((miPerfil, indice) => (
                  <tr key={indice}>
                    <td>{indice + 1}</td>
                    <td>{miPerfil.fullName}</td>
                    <td>{miPerfil.stateUser === 1 ? "Activo" : "Inactivo"}</td>
                    
                    <td className="text-center">
                      {miPerfil.idProfile === 2 ? (
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                            setShow(true);
                            setObjPer(miPerfil);
                          }}
                        >
                          <i
                            className="fa-solid fa-trash-can"
                            style={{ color: "#990000" }}
                          ></i>
                        </a>
                      ) : (
                        <i
                          className="fa-solid fa-trash-can"
                          style={{ color: "#908989" }}
                        ></i>
                      )}{" "}

                      <Link to={"/home/updateuser/" + miPerfil.idUser}>
                        <i
                          className="fa-regular fa-pen-to-square"
                          style={{ color: "#37F010" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="card-footer"
              style={{ textAlign: "right"}}
            >
              <button className="btn2 btn-info btn-sm">
                {" "}
                <a href="/home/adduser" style={{ color: "white" }}>
                  Agregar Usuario
                </a>
              </button>
              <button className="btn2 btn-info btn-sm" style={{marginLeft:'2%'}}>
                {" "}
                <a href="/home/listusers" style={{ color: "white" }}>
                  Listar Usuarios
                </a>
              </button>
            </div>

            {/* Modal para eliminar */}
            {/* *********************************************************************************/}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Eliminar usuario</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Realmente desea eleminar el usuario?
                <br />
                <strong>{objPer.fullName}</strong>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    setShow(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    borrarPerfil(objPer.idUser);
                    setShow(false);
                  }}
                >
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
            {/* *********************************************************************************/}
          </div>
        </div>
      </div>
      {/* Ejempplo de una tabla para presentación de datos: Fin */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}
    </main>
  );
};
