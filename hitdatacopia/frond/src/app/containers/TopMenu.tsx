import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import logito from "../../assets/image/autobochica.png";
import profile from "../../assets/image/profile.png";
import User from "../models/User";
import ServicePrivate from "../services/ServicePrivate";
import ApiBack from "../utilities/domains/ApiBack";

export const Hide = () => {
  document.body.classList.toggle("toggle-sidebar");
};

export const TopMenu = () => {
  
  const user = localStorage.getItem("tokenName");
  const role = localStorage.getItem("tokenRole");
  
  const roleName = (role:any) =>{
      let name = "";
      if (role == 1) {
        name = "Administrador";
      }else{
        name = "Usuario"
      }
      return name
  }
  
  const navegar = useNavigate();

  const LogOut = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    localStorage.removeItem("tokenHitData");
    localStorage.removeItem("tokenRole");
    localStorage.removeItem("tokenName");

    // Redirect  to home page
    navegar("/");
  };

  return (
    <div>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="/home/about" className="logo d-flex align-items-center">
            <img src={logito} alt="Auto Bochica" />
            <span className="d-none d-lg-block">Auto Bochica</span>
          </a>

          <i className="bi bi-list toggle-sidebar-btn" onClick={Hide}></i>
        </div>

        <div className="search-bar">
          <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img src={profile} alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                   {roleName(role)}
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">

                  <h6>{user?.toString()}</h6>
                  <span>AUTO BOCHICA</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="fa-solid fa-user"></i>
                    <span>Mi perfil</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="/#"
                    onClick={LogOut}
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
