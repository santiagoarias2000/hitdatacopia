import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Vehicle from "../../../models/Vehicle";
import ApiBack from "../../../utilities/domains/ApiBack";
import ServicePrivate from "../../../services/ServicePrivate";
import { getLocalDate} from "../../../utilities/functions/DateFormat";

export const DetailsVehicle = () => {
  let { idVehicle } = useParams();
  const regresar = useNavigate();
  const [todoListo, setTodoListo] = useState<boolean>(false);
  let cargaFinalizada = todoListo !== undefined;
  const [objVehicle, setObjVehicle] = useState<Vehicle>();

  useEffect(() => {
    // Consulta los datos de un Vehicle por su _id
    // *******************************************************************
    const obtenerUnVehicle = async () => {
      const urlCargarUnVehicle = ApiBack.DETAIL_VEHICLE + "/" + idVehicle;
      const usuRecibido = await ServicePrivate.requestGET(urlCargarUnVehicle);
      if (usuRecibido) {
        setObjVehicle(usuRecibido);
        setTodoListo(true);
      }
    };
    // *******************************************************************
    obtenerUnVehicle();
  }, [idVehicle]);
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
              <Link to="/home/vehicles/adminVehicle">
                Administración del Vehículo
              </Link>
            </li>
            <li className="breadcrumb-item active">Detalle del Vehículo</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}
      {cargaFinalizada ? (
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-center">
                <b>INFORMACIÓN DE VEHÍCULO</b>
              </div>
              <div className="card-body2">
              
                <h5 className="card-title">
                  <b>Tipo Vehiculo: </b>
                  {objVehicle?.typeVehicle}
                </h5>

                <p className="card-text" style={{color:"black"}}>
                  <b>Placa:</b> {objVehicle?.licensePlate}
                  <br />
                  <b>Vencimiento SOAT:</b>{" "}
                  {getLocalDate(String(objVehicle?.expirationSoat))}
                  <br />
                  <b>Vencimiento Tecnomecanica:</b>{" "}
                  {getLocalDate(String(objVehicle?.expirationTecnomechanic))}
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
        <div>Carga de Vehicle en proceso</div>
      )}
    </main>
    
  );
};
