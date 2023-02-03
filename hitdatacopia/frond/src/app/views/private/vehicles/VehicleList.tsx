
import React, { useState, useEffect } from "react";
import Vehicle from "../../../models/Vehicle";
import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utilities/domains/ApiBack";
import { getLocalDate } from "../../../utilities/functions/DateFormat";

export const VehicleList = () => {
  const [arrayVehicle, setArrayVehicle] = useState<Vehicle[]>([]);

  const getMeVehicleCareBackend = async () => {
    const result = await ServicePrivate.requestGET(ApiBack.GET_VEHICLE);
    setArrayVehicle(result);
  };
 

  useEffect(() => {
    getMeVehicleCareBackend();
  }, []);

  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Vehículos</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Inicio</a>
            </li>
            <li className="breadcrumb-item active">Listado de vehículos</li>
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
                  <th className="text-center" style={{ width: "15%" }}>
                    Orden
                  </th>
                  <th style={{ width: "30%" }}>Tipo Vehiculo</th>
                  <th style={{ width: "15%" }}>Placa</th>
                  <th className="text-center" style={{ width: "20%" }}>
                    Vencimiento SOAT
                  </th>
                  <th className="text-center" style={{ width: "20%" }}>
                    Vencimiento TECNO
                  </th>
                </tr>
              </thead>
              <tbody>
                {arrayVehicle.map((myVehicle, contador) => (
                  <tr key={contador}>
                    <td className="text-center">{contador + 1}</td>
                    <td>{myVehicle.typeVehicle}</td>
                    <td>{myVehicle.licensePlate}</td>
                    <td className="text-center">
                      {getLocalDate(myVehicle.expirationSoat)}
                    </td>
                    <td className="text-center">
                      {getLocalDate(myVehicle.expirationTecnomechanic)}
                    </td>
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
