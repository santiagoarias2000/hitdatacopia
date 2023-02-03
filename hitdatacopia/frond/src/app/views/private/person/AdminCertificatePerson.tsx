import { useState, useEffect } from "react";
import {ScrollMenu}from "react-horizontal-scrolling-menu";
import Person from "../../../models/Person";
import ApiBack from "../../../utilities/domains/ApiBack";
import ServicePrivate from "../../../services/ServicePrivate";
import { getLocalDate } from "../../../utilities/functions/DateFormat";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Vehicle from "../../../models/Vehicle";
import Course from "../../../models/Course";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { ExportToExcel } from "../../../../assets/js/ExportToExcel";

export const AdminCertificatePerson = () => {
  // ************************************************************************
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [arrayPerson, setarrayPerson] = useState<Person[]>([]);
  const [objPer, setObjPer] = useState<Person>(
    new Person(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      new Vehicle("", "", "", "",""),
      new Course("", "", "", 0),
    )
  );
  // ************************************************************************

  // ************************************************************************
  const getPersons = async () => {
    const result = await ServicePrivate.requestGET(ApiBack.FILTER_CERTIFICATE_PERSON);
    setarrayPerson(result);
    return result;
  };

  // ************************************************************************
  // Delete Person
  // **************************************************************************
  const borrarPerfil = async (idPerson: string) => {
    const urlBorrar = ApiBack.DELETE_PERSON + "/" + idPerson;
    const resultado = await ServicePrivate.requestDELETE(urlBorrar);
    console.log(resultado);
    if (typeof resultado.ok === "undefined") {
      MessageToastify(
        "error",
        "No se puede crear eliminar el perfil. Es posible que esté relacionado con usuarios",
        7000
      );
    } else {
      MessageToastify("success", "Perfil eliminado con exito de la base de datos", 7000);
    }
    getPersons();
  };
  // **************************************************************************
  const [data, setData] = useState([]);
  const fileName = "myfile"; // here enter filename for your excel file

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:3123/api/private/person/detailsCertificateEXCEL")
        .then((r) => setData(r.data));
    };
    fetchData();
  }, []);
  // ************************************************************************
  useEffect(() => {
    getPersons();
  }, []);
  // ************************************************************************
  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Usuarios</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
                <Link to="/home/person/admin">Administración de Usuarios</Link>
                </li>
            <li className="breadcrumb-item active">Administración Usuarios Certificados</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}
      <div
        className="card-footer"
        style={{ textAlign: "right"}}
      >
        <ExportToExcel apiData={data} fileName={fileName} />
      </div>

      {/* Ejemplo de una tabla para presentación de datos: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <ScrollMenu>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "3%" }}>
                    {" "}
                    Id{" "}
                  </th>
                  <th style={{ width: "10%" }}>Nombre</th>
                  <th style={{ width: "10%" }}>Apellido</th>
                  <th style={{ width: "10%" }}>Correo</th>
                  <th style={{ width: "7%" }}>Fecha de nacimiento</th>
                  <th style={{ width: "3%" }}>Genero</th>
                  <th style={{ width: "10%" }}>Tipo de sangre</th>
                  <th style={{ width: "7%" }}>Documento</th>
                  <th style={{ width: "10%" }}>Lugar de Expedicion</th>
                  <th style={{ width: "10%" }}>Dirección</th>
                  <th style={{ width: "10%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {arrayPerson.map((myPerson, index) => (
                  <tr key={index}>
                    <td className="text-center align-middle">
                      <small>{index + 1}</small>{" "}
                    </td>
                    <td className="align-middle">
                      {myPerson.firstName} {myPerson.secondName}
                    </td>
                    <td className="align-middle">
                      {myPerson.firstLastName} {myPerson.secondLastName}
                    </td>
                    <td className="align-middle">{myPerson.email}</td>
                    <td className="align-middle">
                      {getLocalDate(myPerson.dateBirth)}
                    </td>
                    <td className="align-middle">{myPerson.gender}</td>
                    <td className="align-middle">{myPerson.typeBlood}</td>
                    <td className="align-middle">{myPerson.documentNumber}</td>
                    <td className="align-middle">{myPerson.placeExpedition}</td>
                    <td className="align-middle">{myPerson.address}</td>
                    <td className="text-center align-middle">
                      <Link
                        to={"/home/person/details/" + myPerson.idPerson}
                      >
                        <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                      </Link>{" "}
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(true);
                          setObjPer(myPerson);
                        }}
                      >
                        <i
                          className="fa-solid fa-trash-can fa-sm"
                          style={{ color: "#CC0000" }}
                        ></i>
                      </a>{" "}
                      <Link
                        to={"/home/person/update/" + myPerson.idPerson}
                      >
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
            </ScrollMenu>

            {/* Modal para eliminar */}
            {/* *********************************************************************************/}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Eliminar perfil</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Realmente desea eleminar el perfil?
                <br />
                <strong>{objPer.firstName}-{objPer.firstLastName}</strong>
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
                    borrarPerfil(objPer.idPerson);
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
