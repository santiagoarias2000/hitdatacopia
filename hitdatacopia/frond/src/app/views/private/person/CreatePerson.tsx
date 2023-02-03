import React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastify";

import Person from "../../../models/Person";
import ApiBack from "../../../utilities/domains/ApiBack";
import noFoto from "../../../../assets/image/profile.png";
import ServicePrivate from "../../../services/ServicePrivate";
import { useForm } from "../../../utilities/hooks/useForm";
import { MessageToastify } from "../../../utilities/functions/MessageToastify";
import { ConvertBase64 } from "../../../utilities/functions/ConvertBase64";
import Course from "../../../models/Course";
import Vehicle from "../../../models/Vehicle";

export const CreatePerson = () => {
  const [allReady, setAllReady] = useState<boolean>(false);
  let loadCompleted = allReady !== false;

  const redirect = useNavigate();
  const [miniatureImage, setMiniatureImage] = useState(noFoto);
  const [photoBase64, setPhotoBase64]: any = useState();

  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [inProcess, setInProcess] = useState<boolean>(false);
  const [arrayCourse, setArrayCourse] = useState<Course[]>([]);
  const [arryaVehicle, setArrayVehicle] = useState<Vehicle[]>([]);
  // *******************************************************************
  //Photo
  const [img, setImg]: any = useState(null);
  const webcam: any = useRef<Webcam>(null);
  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },
    facingMode: "user",
  };
  const capture = useCallback(() => {
    const imageSrc: any = webcam.current.getScreenshot();
    setImg(imageSrc);
  }, [webcam]);
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
      new Vehicle("", "", "", "", ""),
      new Course("", "", "", 0)
    )
  );
  // *******************************************************************

  // get vehicle to be displayed in the combo
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
  // ************************************************************************

  // display image on screen
  // *******************************************************************
  const showImage = async (e: any) => {
    const files = e.target.files;
    const image = files[0];
    setMiniatureImage(URL.createObjectURL(image));
    doubleLink(e);
    const base64 = await ConvertBase64(image);
    setPhotoBase64(String(base64));
  };
  // ************************************************************************

  // Función flecha para limpiar cajas
  const cleanBox = (form: HTMLFormElement) => {
    object.idPerson = "";
    object.firstName = "";
    object.secondName = "";
    object.firstLastName = "";
    object.secondLastName = "";
    object.phone = "";
    object.dateBirth = "";
    object.address = "";
    object.occupation = "";
    object.typeDocument = "";
    object.documentNumber = "";
    object.placeExpedition = "";
    object.gender = "";
    object.typeBlood = "";
    object.statusCivil = "";
    object.stratum = "";
    object.sisben = "";
    object.levelEducation = "";
    object.certificate = "";
    object.stateTuition = "";
    object.dateTuition = "";
    object.photo = "";
    object.photo64 = "";
    object.photoFingerprint = "";
    object.photoFingerprint64 = "";
    object.email = "";
    object.vehicle.licensePlate = "";
    object.course.typeCourse = "";

    form.firstName.value = "";
    form.secondName.value = "";
    form.firstLastName.value = "";
    form.secondLastName.value = "";
    form.phone.value = "";
    form.dateBirth.value = "";
    form.address.value = "";
    form.occupation.value = "";
    form.typeDocument.value = "";
    form.documentNumber.value = "";
    form.placeExpedition.value = "";
    form.gender.value = "";
    form.typeBlood.value = "";
    form.statusCivil.value = "";
    form.stratum.value = "";
    form.sisben.value = "";
    form.levelEducation.value = "";
    form.certificate.value = "";
    form.stateTuition.value = "";
    form.dateTuition.value = "";
    form.email.value = "";
    form.photo.value = "";
    form.photo64.value = "";
    form.photoFingerprint.value = "";
    form.photoFingerprint64.value = "";
    form.vehicle.licensePlate.value = "";
    form.course.typeCourse.value = "";
    form.classList.remove("was-validated");
  };

  // Create Person
  // *******************************************************************
  const sendform = async (fh: formaHtml) => {
    fh.preventDefault();
    setInProcess(true);
    const form = fh.currentTarget;
    form.classList.add("was-validated");

    if (form.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      object.photo64 = photo64;
      object.photo64 = img;
      const result = await ServicePrivate.requestPOST(
        ApiBack.CREATE_PERSON,
        object
      );
      console.log(object);
      if (result.ok) {
        setInProcess(false);
        MessageToastify("info", "Usuarios creado paspiiss!!", 7000);
      } else {
        MessageToastify(
          "error",
          "Usuarios el numero de cedula ya esta asociado",
          7000
        );
      }
      cleanBox(form);
    }
  };
  // *******************************************************************

  // Hook que carga información al renderizar la página
  useEffect(() => {
    getVehicles();
    getCourse();
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
            <li className="breadcrumb-item active">Crear Usuarios</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de form: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Formulario Usuarios</h5>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="firstName">
                <Form.Label column sm={3}>
                  Foto:
                </Form.Label>
                <Col >
                  <div className="d-flex flex-column justify-content-center col-sm-9">
                    {img === null ? (
                      <>
                        <Webcam
                          audio={false}
                          mirrored={true}
                          height={200}
                          width={400}
                          ref={webcam}
                          screenshotFormat="image/jpeg"
                          videoConstraints={videoConstraints}
                          onUserMediaError={()=>window.alert('Can access your camera')}
                        />

                      </>
                    ) : (
                      <>
                        <img src={img} alt="screenshot" />

                        <Button onClick={() => setImg(null)} className="btn2 btn-info btn-sm">Retake</Button>
                      </>
                    )}
                  </div>

                  <Form.Control.Feedback type="invalid">
                    Foto requeridad
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                  <Col sm={{  offset: 3 }}>
                    <Button onClick={capture} className="btn2 btn-info btn-sm">
                      Tomar foto
                    </Button>
                  </Col>
                </Form.Group>  
            </Form>

            {loadCompleted ? (
              <Form noValidate validated={inProcess} onSubmit={sendform}>
                <Form.Group as={Row} className="mb-3" controlId="firstName">
                  <Form.Label column sm={3}>
                    Primer Nombre:
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
                    Segundo Nombre:
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
                    Primer Apellido:
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
                    Segundo Apellido:
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
                    Numero telefono:
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
                    Fecha de nacimiento:
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
                    Dirección:
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
                    Ocupación:
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
                    Tipo Documento:
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
                    Numero documento:
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
                    Lugar de expedicion:
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
                    Genero:
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
                    RH:
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
                    Estado civil:
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
                    Estrato:
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
                    Sisben:
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
                    Nivel de educación:
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
                    Certificado:
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
                    Estado matricula:
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
                    Fecha Matricula:
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
                    Correo electrónico:
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
                    Vehicle:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="vehicle"
                      value={vehicle.idVehicle}
                      onChange={doubleLink}
                    >
                      <option value="">Seleccione el vehicle</option>
                      {arryaVehicle.map((myVehicle, indice) => (
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
                    Curso:
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
                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 9, offset: 3 }}>
                    <Button type="submit" className="btn2 btn-info btn-sm">
                      Crear Certificado
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
