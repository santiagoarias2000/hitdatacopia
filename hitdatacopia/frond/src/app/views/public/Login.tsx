import { useState } from "react";
import Form from "react-bootstrap/Form";

import { Link, useNavigate } from "react-router-dom";
import logito from "../../../assets/image/autobochica.png";
import { useForm } from "../../utilities/hooks/useForm";

import * as encriptar from "js-sha512";
import ApiBack from "../../utilities/domains/ApiBack";
import AccessUser from "../../models/AccessUser";
import { MessageToastify } from "../../utilities/functions/MessageToastify";
import UserLogIn from "../../services/UserLogin";

export const Login = () => {

  //Variables
  const myNavigate = useNavigate();
  type formHtml = React.FocusEvent<HTMLFormElement>;
  const [inProcess, setProcess] = useState<boolean>(false);
  let{emailUser, passwordUser, doubleLink, object}=useForm<AccessUser>(new AccessUser("","",""));

  //Functions
  const cleanBoxs = (myForm: HTMLFormElement) =>{
    myForm.reset();

    object.emailUser = "";
    object.passwordUser= "";

    myForm.emailUser.value = "";
    myForm.passwordUser.value = "";
    myForm.classList.remove("was-validated");

  };

  const proccesForm = async (fh: formHtml) =>{
    fh.preventDefault();
    setProcess(true);
    const formCurrent = fh.currentTarget;
    formCurrent.classList.add("was-validated");

    if(formCurrent.checkValidity() === false){
      fh.preventDefault();
      fh.stopPropagation();
    }else{
      //const passwordEncypted = encriptar.sha512(object.passwordUser);
      //object.passwordUser = passwordEncypted;
      const urlLogIn = ApiBack.URL + ApiBack.URL_PUBLIC_LOGIN;
      const result = await UserLogIn.consumeService(
        urlLogIn,
        object
      );
      if (result.tokenHitData) {
        localStorage.setItem("tokenHitData", result.tokenHitData);
        localStorage.setItem("tokenRole", result.tokenRole);
        localStorage.setItem("tokenName", result.tokenName);
        setProcess(false);
        myNavigate("/home");
       
      }else{
       
        
        if (result.miError) {
         
          MessageToastify(
          "warning",
          "Credenciales incorrectas",
          7000
        );
        }
        cleanBoxs(formCurrent);
       
      }
    }

  };



  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <a
                  href="/home"
                  className="logo d-flex align-items-center w-auto"
                >
                  <img src={logito} alt="" />
                  <span className="d-none d-lg-block nice">AUTO BOCHICA</span>
                </a>
              </div>

              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Inicio de sesión
                    </h5>
                    <p className="text-center small">
                      Favor presentar credenciales
                    </p>
                  </div>

                  <Form
                    className="row g-3"
                    noValidate
                    validated={inProcess}
                    onSubmit={proccesForm}
                  >
                    <div className="col-12">
                      <Form.Group controlId="emailUser">
                        <Form.Label>Correo electrónico</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">@</span>
                          <Form.Control
                            required
                            type="email"
                            name="emailUser"
                            className="form-control"
                            value={emailUser}
                            onChange={doubleLink}
                          />
                          <Form.Control.Feedback type="invalid">
                            Debe ingresar un correo electronico valido
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-12">
                      <Form.Group controlId="passwordUser">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          name="passwordUser"
                          className="form-control"
                          minLength={6}
                          value={passwordUser}
                          onChange={doubleLink}
                          placeholder="Password"
                        />
                        <Form.Control.Feedback type="invalid">
                          Contraseña incorrecta
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit">
                        Iniciar sesión
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
