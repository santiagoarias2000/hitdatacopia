import { useState, useEffect } from "react";

import { ExcelDownloadButton } from "@pickk/react-excel";
import axios from "axios";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Person from "../../../models/Person";
import ApiBack from "../../../utilities/domains/ApiBack";
import ServicePrivate from "../../../services/ServicePrivate";
import { getLocalDate } from "../../../utilities/functions/DateFormat";
import { Link } from "react-router-dom";
import { ExportToExcel } from "../../../../assets/js/ExportToExcel";

export const ListPerson = () => {
  // ************************************************************************
  const [arrayPerson, setarrayPerson] = useState<Person[]>([]);
  // ************************************************************************

  // ************************************************************************
  const getPersons = async () => {
    const result = await ServicePrivate.requestGET(ApiBack.VIEWS_PERSON);
    console.log(result);
    setarrayPerson(result);
  };
  // ************************************************************************

  const [data, setData] = useState([]);
  const fileName = "myfile"; // here enter filename for your excel file

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:3123/api/private/person/detailsEXCEL")
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
            <li className="breadcrumb-item active">Listado de Usuarios</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de una tabla para presentación de datos: Inicio */}
      <div className="card-footer" style={{ textAlign: "right" }}>
        <button className="btn2 btn-info btn-sm">
          {" "}
          <a href="/home/person/certificate" style={{ color: "white" }}>
            CERTIFICADO
          </a>
        </button>
        
        <button className="btn2 btn-info btn-sm" style={{ marginLeft: "2%" }}>
          {" "}
          <a href="/home/person/nocertificate" style={{ color: "white" }}>
            NO CERTIFICADO
          </a>
        </button>
        <ExportToExcel apiData={data} fileName={fileName} />
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <ScrollMenu>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: "5%" }}>
                      {" "}
                      Id{" "}
                    </th>
                    <th style={{ width: "10%" }}>Nombre</th>
                    <th style={{ width: "10%" }}>Apellido</th>
                    <th style={{ width: "5%" }}>Telefono</th>
                    <th style={{ width: "5%" }}>Fecha de nacimiento</th>
                    <th style={{ width: "5%" }}>Dirección</th>
                    <th style={{ width: "5%" }}>Ocupación</th>
                    <th style={{ width: "5%" }}>Tipo Documento</th>
                    <th style={{ width: "5%" }}>Documento</th>
                    <th style={{ width: "5%" }}>Lugar de Expedicion</th>
                    <th style={{ width: "5%" }}>Genero</th>
                    <th style={{ width: "5%" }}>Tipo de sangre</th>
                    <th style={{ width: "5%" }}>Estado civil</th>
                    <th style={{ width: "5%" }}>Estrato</th>
                    <th style={{ width: "5%" }}>Sisben</th>
                    <th style={{ width: "5%" }}>Nivel Educacion</th>
                    <th style={{ width: "5%" }}>Certificado</th>
                    <th style={{ width: "5%" }}>Estado Matricula</th>
                    <th style={{ width: "5%" }}>Fecha Matricula</th>
                    <th style={{ width: "5%" }}>Correo</th>
                    <th style={{ width: "5%" }}>Tipo de vehiculo</th>
                    <th style={{ width: "5%" }}>Placa</th>
                    <th style={{ width: "5%" }}>Fecha soat</th>
                    <th style={{ width: "5%" }}>Fecha tecnicomecanica</th>
                    <th style={{ width: "5%" }}>Tipo curso</th>
                    <th style={{ width: "5%" }}>Tiempo curso</th>
                    <th style={{ width: "5%" }}>Precio</th>
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
                      <td className="align-middle">{myPerson.phone}</td>
                      <td className="align-middle">
                        {getLocalDate(myPerson.dateBirth)}
                      </td>
                      <td className="align-middle">{myPerson.address}</td>
                      <td className="align-middle">{myPerson.occupation}</td>
                      <td className="align-middle">{myPerson.typeDocument}</td>
                      <td className="align-middle">
                        {myPerson.documentNumber}
                      </td>
                      <td className="align-middle">
                        {myPerson.placeExpedition}
                      </td>
                      <td className="align-middle">{myPerson.gender}</td>
                      <td className="align-middle">{myPerson.typeBlood}</td>
                      <td className="align-middle">{myPerson.statusCivil}</td>
                      <td className="align-middle">{myPerson.stratum}</td>
                      <td className="align-middle">{myPerson.sisben}</td>
                      <td className="align-middle">
                        {myPerson.levelEducation}
                      </td>
                      <td className="align-middle">{myPerson.certificate}</td>
                      <td className="align-middle">{myPerson.stateTuition}</td>
                      <td className="align-middle">
                        {getLocalDate(myPerson.dateTuition)}
                      </td>
                      <td className="align-middle">{myPerson.email}</td>
                      <td className="align-middle">
                        {myPerson.vehicle.typeVehicle}
                      </td>
                      <td className="align-middle">
                        {myPerson.vehicle.licensePlate}
                      </td>
                      <td className="align-middle">
                        {getLocalDate(myPerson.vehicle.expirationSoat)}
                      </td>
                      <td className="align-middle">
                        {getLocalDate(myPerson.vehicle.expirationTecnomechanic)}
                      </td>
                      <td className="align-middle">
                        {myPerson.course.typeCourse}
                      </td>
                      <td className="align-middle">
                        {myPerson.course.timeCourse}{" "}
                      </td>
                      <td className="align-middle">{myPerson.course.price} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollMenu>
          </div>
        </div>
      </div>
      {/* Ejemplo de una tabla para presentación de datos: Fin */}
    </main>
  );
};
