import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Course from "../../../models/Course";
import ApiBack from "../../../utilities/domains/ApiBack";
import noFoto from "../../../../assets/image/acercade.png";
import ServicePrivate from "../../../services/ServicePrivate";

import logito from "../../../../assets/image/autobochica.png";
import { getLocalDate} from "../../../utilities/functions/DateFormat";
import { ToastContainer } from "react-toastify";

export const DetailsCourse = () => {
  let { idCourse } = useParams();
  const regresar = useNavigate();
  const [todoListo, setTodoListo] = useState<boolean>(false);
  let cargaFinalizada = todoListo !== undefined;
  const [objCourse, setObjCourse] = useState<Course>();

  useEffect(() => {
    // Consulta los datos de un Course por su _id
    // *******************************************************************
    const obtenerUnCourse = async () => {
      const urlCargarUnCourse = ApiBack.DETAIL_COURSE + "/" + idCourse;
      const usuRecibido = await ServicePrivate.requestGET(urlCargarUnCourse);
      if (usuRecibido) {
        setObjCourse(usuRecibido);
        setTodoListo(true);
      }
    };
    // *******************************************************************
    obtenerUnCourse();
  }, [idCourse]);
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
              <Link to="/home/courses/adminCourse">
                Administración del Curso
              </Link>
            </li>
            <li className="breadcrumb-item active">Detalle del Curso</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}
      {cargaFinalizada ? (
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-center">
                <b>INFORMACIÓN DEL CURSO</b>
              </div>
              <div className="card-body2">
                <h5 className="card-title">
                  <b>Tipo Curso: </b>
                  {objCourse?.typeCourse}
                </h5>

                <p className="card-text" style={{ color: "black" }}>
                  <b>Tiempo del Curso:</b> {objCourse?.timeCourse}
                  <br />
                  <b>Valor del Curso:</b> {objCourse?.price}
                  <br />
                </p>
              </div>
              <div className="card-footer text-center">
                <button
                  onClick={() => regresar(-1)}
                  className="btn2 btn-info btn-sm"
                >
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Cargando información para la edición</div>
      )}
      {/* Ejemplo de furmulario: Fin */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}
    </main>
  );
};
