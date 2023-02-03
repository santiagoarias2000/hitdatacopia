import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Person from "../../../models/Person";
import ApiBack from "../../../utilities/domains/ApiBack";
import noFoto from "../../../../assets/image/profile.png";
import ServicePrivate from "../../../services/ServicePrivate";
import { getLocalDate} from "../../../utilities/functions/DateFormat";

export const DetailsPerson = () => {
  let { idPerson } = useParams();
  const regresar = useNavigate();
  const [allReady, setAllReady] = useState<boolean>(false);
  let loadCompleted = allReady !== undefined;
  const [objPerson, setObjPerson] = useState<Person>();

  useEffect(() => {
    // Consulta los datos de un Person por su _id
    // ***********************
    const getOnePerson = async () => {
      const urlLoadOnePerson = ApiBack.DETAILS_PERSON + "/" + idPerson;
      const userReceived = await ServicePrivate.requestGET(urlLoadOnePerson);
      if (userReceived) {
        setObjPerson(userReceived);
        setAllReady(true);
      }
    };
    // ***********************
    getOnePerson();
  }, [idPerson]);
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
                <Link to="/home/person/admin">Administración de Información</Link>
                </li>
            <li className="breadcrumb-item active">Detalle de Información</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}
      {loadCompleted ? (
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-center">
                <b>INFORMACIÓN DE USUARIO</b>
              </div>
              <div className="card-body2">
              
                <h5 className="card-title">
                  <b>Nombre Completo </b>
                  {objPerson?.firstName} {objPerson?.secondName} {objPerson?.firstLastName} {objPerson?.secondLastName}
                </h5>
                <p className="card-text" style={{color:"black"}}>
                  <b>Identiciación:</b> {objPerson?.documentNumber}
                  <br />
                  <b>Fecha de nacimiento:</b>{" "}
                  {getLocalDate(String(objPerson?.dateBirth))}
                  <br />
                  <b>Fecha de matricula:</b>{" "}
                  {getLocalDate(String(objPerson?.dateTuition))}
                  <br />
                  <b>Tipo de curso:</b>{" "}
                  {objPerson?.course.typeCourse}
                  <br />
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = noFoto;
                      }}
                      src={objPerson?.photo64}
                      alt="Profile"
                      className="img-thumbnail" style={{height:'250px'}}
                    />
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
        <div>Carga de Person en proceso</div>
      )}
    </main>
  );
};