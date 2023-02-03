import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Course from "../../../models/Course";
import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utilities/domains/ApiBack";
import { getLocalDate } from "../../../utilities/functions/DateFormat";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";

export const AdminCourse = () => {
  // Variables
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [arrayCourse, setArrayCourse] = useState<Course[]>([]);
  const [objCou, setObjCou] = useState<Course>(new Course("","","",0));
  // ************************************************************************


  // Función para listar perfiles
  const getCourse = async () => {
    const resultado = await ServicePrivate.requestGET( ApiBack.GET_COURSE);
    setArrayCourse(resultado);
    return resultado;
  };
  // ************************************************************************


  // Eliminar perfil
  // **************************************************************************
  const deleteCourse = async (idCourse: string) => {
    const urlDelete = ApiBack.DELETE_COURSE + "/" + idCourse;
    const resultado = await ServicePrivate.requestDELETE(urlDelete);
    console.log(idCourse);
    if (typeof resultado.OK === "undefined") {
      MessageToastify( "error", "No se puede eliminar el curso. Relacionado con otra tabla", 7000 );
    } else {
      MessageToastify("success", "Curso Eliminado. SUCCESSFULLY", 7000);
    }
    getCourse();
  };
  // **************************************************************************


  // Hook de react que se usa cuando se renderiza o pinta la página (vista)
  useEffect(() => {
    getCourse();
  }, []);
  // ************************************************************************

  
  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Cursos</h1>
        <nav>
          <ol className="breadcrumb">
          <li className="breadcrumb-item">
              <Link to="/home">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">
              <Link to="/home/courses/adminCourse">
                Administración de Cursos
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
                  <th className="text-center" style={{ width: "15%" }}>Orden</th>
                  <th style={{ width: "25%" }}>Tipo Curso</th>
                  <th className="text-center" style={{ width: "25%" }}>Tiempo Curso</th>
                  <th className="text-center" style={{ width: "25%" }}>Valor Curso</th>
                  <th style={{ width: "10%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {arrayCourse.map((myCourse, contador) => (
                  <tr key={contador}>
                    <td className="text-center">{contador + 1}</td>
                    <td>{myCourse.typeCourse}</td>
                    <td className="text-center">{myCourse.timeCourse}</td>
                    <td className="text-center">{myCourse.price}</td>
                    <td className="text-center align-middle">
                      <Link to={"/home/courses/detailsCourse/" + myCourse.idCourse}>
                        <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                      </Link>{" "}
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(true);
                          setObjCou(myCourse);
                        }}
                      >
                        <i
                          className="fa-solid fa-trash-can fa-sm"
                          style={{ color: "#CC0000" }}
                        ></i>
                      </a>{" "}
                      <Link to={"/home/courses/updateCourse/" + myCourse.idCourse}>
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
                ¿Realmente desea eliminar el curso?
                <br />
                <strong>{objCou.typeCourse}{" de "}{objCou.timeCourse}</strong>
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
                    deleteCourse(objCou.idCourse);
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
