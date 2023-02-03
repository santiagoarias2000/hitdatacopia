import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Vehicle from "../../../models/Vehicle";
import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utilities/domains/ApiBack";
import { getLocalDate } from "../../../utilities/functions/DateFormat";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";

export const AdminVehicle = () => {
  // Variables
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [arrayVehicle, setArrayVehicle] = useState<Vehicle[]>([]);
  const [objVeh, setObjVeh] = useState<Vehicle>(
    new Vehicle("", "", "", "", "")
  );
  // ************************************************************************

  // Función para listar perfiles
  const getVehicle = async () => {
    const resultado = await ServicePrivate.requestGET(ApiBack.GET_VEHICLE);
    setArrayVehicle(resultado);
    return resultado;
  };
  // ************************************************************************

  // Eliminar perfil
  // **************************************************************************
  const deleteVehicle = async (idVehicle: string) => {
    const urlDelete = ApiBack.DELETE_VEHICLE + "/" + idVehicle;
    const resultado = await ServicePrivate.requestDELETE(urlDelete);
    console.log(idVehicle);
    if (typeof resultado.OK === "undefined") {
      MessageToastify(
        "error",
        "No se puede eliminar el vehículo. Relacionado con otra tabla",
        7000
      );
    } else {
      MessageToastify(
        "success",
        "Vehículo Eliminado. SUCCESSFULLY",
        7000
      );
    }
    getVehicle();
  };
  // **************************************************************************

  // Hook de react que se usa cuando se renderiza o pinta la página (vista)
  useEffect(() => {
    getVehicle();
  }, []);
  // ************************************************************************

  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Vehículos</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">
              <Link to="/home/vehicles/adminVehicle">
                Administración de Vehículos
              </Link>
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
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "15%" }}>
                    Orden
                  </th>
                  <th style={{ width: "20%" }}>Tipo Vehiculo</th>
                  <th style={{ width: "15%" }}>Placa</th>
                  <th className="text-center" style={{ width: "20%" }}>
                    Vencimiento SOAT
                  </th>
                  <th className="text-center" style={{ width: "20%" }}>
                    Vencimiento TECNO
                  </th>
                  <th style={{ width: "10%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {arrayVehicle.map((myVehicle, contador) => (
                  <tr key={contador}>
                    <td className="text-center">{contador+1}</td>
                    <td>{myVehicle.typeVehicle}</td>
                    <td>{myVehicle.licensePlate}</td>
                    <td className="text-center">
                      {getLocalDate(myVehicle.expirationSoat)}
                    </td>
                    <td className="text-center">
                      {getLocalDate(myVehicle.expirationTecnomechanic)}
                    </td>
                    <td className="text-center align-middle">
                      <Link
                        to={
                          "/home/vehicles/detailsVehicle/" + myVehicle.idVehicle
                        }
                      >
                        <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                      </Link>{" "}
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(true);
                          setObjVeh(myVehicle);
                        }}
                      >
                        <i
                          className="fa-solid fa-trash-can fa-sm"
                          style={{ color: "#CC0000" }}
                        ></i>
                      </a>{" "}
                      <Link
                        to={
                          "/home/vehicles/updateVehicle/" + myVehicle.idVehicle
                        }
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

            {/* Modal para eliminar */}
            {/* *********************************************************************************/}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Eliminar vehículo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Realmente desea eliminar el vehículo?
                <br />
                <strong>{objVeh.licensePlate}</strong>
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
                    deleteVehicle(objVeh.idVehicle);
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
