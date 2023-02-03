import { useState, useEffect } from "react";
import Course from "../../../models/Course";
import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utilities/domains/ApiBack";
import { getLocalDate } from "../../../utilities/functions/DateFormat";

export const CourseList = () => {
  const [arrayCourse, setArrayCourse] = useState<Course[]>([]);

  const getMeCourseCareBackend = async () => {
    const result = await ServicePrivate.requestGET(ApiBack.GET_COURSE);
    setArrayCourse(result);
  };

  useEffect(() => {
    getMeCourseCareBackend();
  }, []);
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
            <li className="breadcrumb-item active">Listado de cursos</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de una tabla para presentación de datos: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "25%" }}>Orden</th>
                  <th style={{ width: "15%" }}>Tipo Curso</th>
                  <th className="text-center" style={{ width: "25%" }}>Tiempo Curso</th>
                  <th className="text-center" style={{ width: "25%" }}>Valor Curso</th>
                </tr>
              </thead>
              <tbody>
                {arrayCourse.map((myCourse, contador) => (
                  <tr key={contador}>
                    <td className="text-center">{contador + 1}</td>
                    <td>{myCourse.typeCourse}</td>
                    <td className="text-center">{myCourse.timeCourse}</td>
                    <td className="text-center">{myCourse.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Ejemplo de una tabla para presentación de datos: Fin */}
    </main>
  );
};