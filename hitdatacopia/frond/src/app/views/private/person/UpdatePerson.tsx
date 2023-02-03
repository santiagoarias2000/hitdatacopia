import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";

import Person from "../../../models/Person";
import Vehicle from "../../../models/Vehicle";
import Course from "../../../models/Course";
import ApiBack from "../../../utilities/domains/ApiBack";
import noFoto from "../../../../assets/image/profile.png";
import ServicePrivate from "../../../services/ServicePrivate";
import { useForm } from "../../../utilities/hooks/useForm";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";
import { ConvertBase64 } from "../../../utilities/functions/ConvertBase64";
export const UpdatePerson = () => {
  let { idPerson } = useParams();
  const [photoBase64, setPhoteBase64] = useState<string>("");
  const [miniatureImage, setMiniatureImage] = useState(noFoto);
  const [nameImageTempo, setNameImageTempo] = useState<string>("");

  const [allReady, setAllReady] = useState<boolean>(false);
  let loadCompleted = allReady !== false;

  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [inProcess, setInProcess] = useState<boolean>(false);
  const [arrayVehicle, setArrayVehicle] = useState<Vehicle[]>([]);
  const [arrayCourse, setArrayCourse] = useState<Course[]>([]);
  // *******************************************************************
  //Photo
// Hook for form
let {
    firstName,
    secondName,
    firstLastName,
    secondLastName,
    phone,
    dateBirth,
    address,
    occupation,
    typeDocument,
    documentNumber,
    placeExpedition,
    gender,
    typeBlood,
    statusCivil,
    stratum,
    sisben,
    levelEducation,
    certificate,
    stateTuition,
    dateTuition,
    email,
    photo,
    photo64,
    photoFingerprint,
    photoFingerprint64,
    vehicle,
    course,
    doubleLink,
    object,
  } = useForm<Person>(
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
      new Course("", "", "", 0)
    )
  );  
  // *******************************************************************


  // Consult of the data in the Person for this id
  // *******************************************************************
  const getOnePerson = async () => {
    const urlLoadPerson = ApiBack.DETAILS_PERSON + "/" + idPerson;
    const personReceived = await ServicePrivate.requestGET(urlLoadPerson);
    if (personReceived) {
        object.idPerson = personReceived.idPerson;
        object.firstName = personReceived.firstName;
        object.secondName = personReceived.secondName;
        object.firstLastName = personReceived.firstLastName;
        object.secondLastName = personReceived.secondLastName;
        object.phone = personReceived.phone;
        object.dateBirth = personReceived.dateBirth;
        object.address = personReceived.address;
        object.occupation = personReceived.occupation;
        object.typeDocument = personReceived.typeDocument;
        object.documentNumber = personReceived.documentNumber;
        object.placeExpedition = personReceived.placeExpedition;
        object.gender = personReceived.gender;
        object.typeBlood = personReceived.typeBlood;
        object.statusCivil = personReceived.statusCivil;
        object.stratum = personReceived.stratum;
        object.sisben = personReceived.sisben;
        object.levelEducation = personReceived.levelEducation;
        object.certificate = personReceived.certificate;
        object.stateTuition = personReceived.stateTuition;
        object.dateTuition = personReceived.dateTuition;
        object.email=personReceived.email;
        object.photo64=personReceived.photo64;
        object.vehicle=personReceived.vehicle;
        object.course=personReceived.course;
      // Input file es inmutable !!!. La siguiente linea no se puede habilitar
      // object.photo = personReceived.photo;
      if (personReceived) {
        setPhoteBase64(personReceived.photo64);
        setMiniatureImage(personReceived.photo64);
        setNameImageTempo(personReceived.photo);
        setAllReady(true);
      }
    }
  };
  // *******************************************************************

  const getVehicles = async () => {
    const result = await ServicePrivate.requestGET(ApiBack.GET_VEHICLE);
    setArrayVehicle(result);
    if (result) {
      setAllReady(true);
    }
  };
  // get course to be displayed in the combo
  const getCourse = async () => {
    const result = await ServicePrivate.requestGET(ApiBack.GET_COURSE);
    setArrayCourse(result);
    if (result) {
      setAllReady(true);
    }
  };


  // Mostrar imagen en pantalla
  // *******************************************************************
  const showImage = async (e: any) => {
    const archivos = e.target.files;
    const imagen = archivos[0];
    setMiniatureImage(URL.createObjectURL(imagen));
    doubleLink(e);
    const base64 = await ConvertBase64(imagen);
    setPhoteBase64(String(base64));
  };
  // ************************************************************************


  // Actualizar el Person
  // *******************************************************************
  const sendForm = async (fh: formaHtml) => {
    fh.preventDefault();
    setInProcess(true);
    const formulario = fh.currentTarget;
    formulario.classList.add("was-validated");

    if (formulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
        object.photo64 = photo64;
        object.photo64 = photoBase64;

      const urlUpdate = ApiBack.UPDATE_PERSON + "/" + idPerson;
      const objectUpdate = new Person( object.idPerson,
        object.firstName,
        object.secondName,
        object.firstLastName,
        object.secondLastName,
        object.phone,
        object.dateBirth,
        object.address,
        object.occupation,
        object.typeDocument,
        object.documentNumber,
        object.placeExpedition,
        object.gender,
        object.typeBlood,
        object.statusCivil,
        object.stratum,
        object.sisben,
        object.levelEducation,
        object.certificate,
        object.stateTuition,
        object.dateTuition,
        object.email,
        object.photo,
        object.photo64,
        object.photoFingerprint,
        object.photoFingerprint64,
        object.vehicle,
        object.course);
      const result = await ServicePrivate.requestPUT( urlUpdate, objectUpdate );

      if (result.ok) {
        setInProcess(false);
        MessageToastify("success", "Usuario actualizado correctamente", 7000);
      } else {
        MessageToastify( "error", "No se puede actualizar el usuario. Verifique el numero de documento.", 7000 );
      }
    }
  };
  // *******************************************************************

// Hook para cargar información una vez renderizado el componente
  useEffect(() => {
    getVehicles();
    getCourse();
    getOnePerson();
  }, []);
// *******************************************************************
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
              <Link to="/home/person/admin">Administración de usuarios</Link>
            </li>
            <li className="breadcrumb-item active">Actualizar</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de form: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Formulario Certificado</h5>

            {loadCompleted ? (
              <Form noValidate validated={inProcess} onSubmit={sendForm}>
                <Form.Group as={Row} className="mb-3" controlId="firstName">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Primer Nombre:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={firstName}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Primer Nombre de la Persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="secondName">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Segundo Nombre:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="secondName"
                      className="form-control"
                      value={secondName}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Segundo Nombre de la Persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="firstLastName">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Primer Apellido:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="firstLastName"
                      className="form-control"
                      value={firstLastName}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Primer Apellido de la Persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="secondLastName"
                >
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Segundo Apellido:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="secondLastName"
                      className="form-control"
                      value={secondLastName}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Segundo Apellido de la Persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="phone">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Numero telefono:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="number"
                      name="phone"
                      className="form-control"
                      value={phone}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Numero de telefono de la Persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="dateBirth">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Fecha de nacimiento:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="date"
                      name="dateBirth"
                      className="form-control"
                      value={dateBirth}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Primer Apellido de la Persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="address">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Dirección:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="address"
                      className="form-control"
                      value={address}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Dirección de recidencia de la Persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="occupation">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Ocupación:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="occupation"
                      className="form-control"
                      value={occupation}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ocupación de la Persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="typeDocument">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Tipo Documento:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="typeDocument"
                      value={typeDocument}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione el tipo documento</option>
                      <option value={"CC"}>CC</option>
                      <option value={"TI"}>TI</option>
                      <option value={"NIT"}>NIT</option>
                      <option value={"NIP"}>NIP</option>
                      <option value={"PASAPORTE"}>PASAPORTE</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el tipo de documento de la persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="documentNumber"
                >
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Numero documento:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="documentNumber"
                      className="form-control"
                      value={documentNumber}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Numero de documento de la Persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="placeExpedition"
                >
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Lugar de expedicion:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="placeExpedition"
                      className="form-control"
                      value={placeExpedition}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Lugar de expedición del documento de la Persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="gender">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Genero:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="gender"
                      value={gender}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione el genero</option>
                      <option value={"M"}>M</option>
                      <option value={"F"}>F</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el genero de la persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="typeBlood">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>RH:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="typeBlood"
                      value={typeBlood}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione el RH</option>
                      <option value={"A+"}>A+</option>
                      <option value={"A-"}>A-</option>
                      <option value={"B+"}>B+</option>
                      <option value={"B-"}>B-</option>
                      <option value={"AB+"}>AB+</option>
                      <option value={"AB-"}>AB-</option>
                      <option value={"O+"}>O+</option>
                      <option value={"O-"}>O-</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el RH de la persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="statusCivil">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Estado civil:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="statusCivil"
                      value={statusCivil}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione el estado civil</option>
                      <option value={"CASADO(A)"}>CASADO(A)</option>
                      <option value={"SOLTERO(A)"}>SOLTERO(A)</option>
                      <option value={"UNION LIBRE"}>UNION LIBRE</option>
                      <option value={"VIUDO(A)"}>VIUDO(A)</option>
                      <option value={"DIVORCIADO(A)"}>DIVORCIADO(A)</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el estado civil de la persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="stratum">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Estrato:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="stratum"
                      value={stratum}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione el estrato</option>
                      <option value={"1"}>1</option>
                      <option value={"2"}>2</option>
                      <option value={"3"}>3</option>
                      <option value={"4"}>4</option>
                      <option value={"5"}>5</option>
                      <option value={"6"}>6</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el estrato de la persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="sisben">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Sisben:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="sisben"
                      value={sisben}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione el sisben</option>
                      <option value={"A"}>A</option>
                      <option value={"B"}>B</option>
                      <option value={"C"}>C</option>
                      <option value={"D"}>D</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el estrato de la persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="levelEducation"
                >
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Nivel de educación:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="levelEducation"
                      value={levelEducation}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione el nivel educaión</option>
                      <option value={"EDUCACION PRIMARIA"}>
                        EDUCACION PRIMARIA
                      </option>
                      <option value={"EDUCACION SECUNDARIA"}>
                        EDUCACION SECUNDARIA
                      </option>
                      <option value={"EDUCACION SUPERIOR"}>
                        EDUCACION SUPERIOR
                      </option>
                      <option value={"TECNICO"}>TECNICO</option>
                      <option value={"TECNOLOGO"}>TECNOLOGO</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el nivel educación de la persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="certificate">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Certificado:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="certificate"
                      value={certificate}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione estado certificado</option>
                      <option value={"CERTIFICADO"}>CERTIFICADO</option>
                      <option value={"NO CERTIFICADO"}>NO CERTIFICADO</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione estado de certificado de la persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="stateTuition">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Estado matricula:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="stateTuition"
                      value={stateTuition}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione estado matricula</option>
                      <option value={"MATRICULADO"}>MATRICULADO</option>
                      <option value={"NO MATRICULADO"}>NO MATRICULADO</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione estado de matricula de la persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="dateTuition">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Fecha Matricula:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="date"
                      name="dateTuition"
                      className="form-control"
                      value={dateTuition}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Fecha de Matricula de la Persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="email">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Correo electrónico:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="email"
                      name="email"
                      className="form-control"
                      value={email}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Correo inválido
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="idVehicle">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Placa Vehiculo:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="idVehicle"
                      value={vehicle.idVehicle}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione el vehicle</option>
                      {arrayVehicle.map((myVehicle, indice) => (
                        <option key={indice} value={myVehicle.idVehicle}>
                          {myVehicle.licensePlate}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione la placa del vehicle
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="idCourse">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Tipo de Curso:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="course"
                      value={course.idCourse}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione el Curso</option>
                      {arrayCourse.map((myCourse, indice) => (
                        <option key={indice} value={myCourse.idCourse}>
                          {myCourse.typeCourse}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el curso de la persona
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                
                <div className="mb-3 row">
                  <div className="col-sm-3"></div>
                  <div className="d-flex justify-content-center col-sm-9">
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = noFoto;
                      }}
                      src={miniatureImage}
                      alt="Profile"
                      className="img-thumbnail" style={{height:'250px'}}
                    />
                  </div>
                </div>
                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 9, offset: 3 }}>
                    <Button type="submit" className="btn2 btn-info btn-sm">
                      Actualizar
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <div>Cargando información de los perfiles</div>
            )}
          </div>
        </div>
      </div>
      {/* Ejemplo de form: Inicio */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}
    </main>
    );
  };
  