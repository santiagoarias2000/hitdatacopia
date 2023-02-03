import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TypeOfExpression } from "typescript";
import Profile from "../../../models/Profile";
import User from "../../../models/User";
import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utilities/domains/ApiBack";

import { getLocalDate } from "../../../utilities/functions/DateFormat";

export const UserList = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const [objectUser, setObjectUser] = useState<User>(new User("","","",0,"",new Date(),new Profile("","",0)));
  const [arrayUsers, setArrayUsers] = useState<User[]>([]);
  
  const giveMeUsers = async () => {
    const result = await ServicePrivate.requestGET(ApiBack.USERS_LIST);
    setArrayUsers(result);
  };

  const userProfile = (profile:any)=>{
    var back :any;
    if (profile === 1) {
      back = "Administrador"
    }else{
      back = "Usuario"
    }
    return back;

  }

  useEffect(() => {
    giveMeUsers();
  }, []);

  return (
    
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Usuarios Admin</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/home">Inicio</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/home/adminuser">Administración de Usuarios Admin</a>
            </li>
            <li className="breadcrumb-item active">Listado de Usuarios Admin</li>
          </ol>
        </nav>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr className="text-center align-middle">
                  <th className="text-center" style={{ width: "8%" }}>
                    {" "}
                    Nro{" "}
                  </th>
                  <th style={{ width: "40%" }}>Usuario</th>
                  <th style={{ width: "10%" }}>Estado</th>
                  <th style={{ width: "10%" }}>Fecha</th>
                  <th style={{ width: "10%" }}>Perfil</th> 
                </tr>
              </thead>
              <tbody className="text-center align-middle">
                {arrayUsers.map((miUsu, indice) => (
                  <tr key={indice}>
                    <td className="text-center align-middle">
                      <small>{indice + 1}</small>{" "}
                    </td>
                    <td>
                      {miUsu.fullName}
                      <br />
                      <small className="text-muted">{miUsu.emailUser}</small>
                    </td>

                    <td
                      className={
                        miUsu.stateUser === 1
                          ? "text-center align-middle text-success"
                          : "text-center align-middle text-danger"
                      }
                    >
                      <small>
                        {miUsu.stateUser === 1 ? "Activo" : "Inactivo"}{" "}
                      </small>
                    </td>
                    <td className="align-middle">
                      {getLocalDate(miUsu.dateUser)}
                    </td>
                    <td className="text-center align-middle">
                      {userProfile(miUsu.idProfile)}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};
