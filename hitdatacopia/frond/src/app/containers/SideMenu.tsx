import { Link } from "react-router-dom";
import { optionsAdmin, optionsGuest } from "../utilities/domains/OptionsSystem";
export const SideMenu = () => {
  const role = localStorage.getItem("tokenRole");
  const nameProfile = role?.toString();

  let options: any[] = [];

  switch (nameProfile) {
    case "1":
      options = optionsAdmin;
      break;
    case "2":
      options = optionsGuest;
      break;
    default:
      console.log("No hay menú...");
      break;
  }
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {options.map((option, index) =>
          option.sons.length ? (
            <li className="nav-item" key={"li" + index}>
              <a
                className="nav-link collapsed"
                data-bs-target={"#menu" + index}
                data-bs-toggle="collapse"
                href="/#"
              >
                <i className={option.icon}></i>
                <span>{option.name}</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul
                id={"menu" + index}
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
              >
                {option.sons.map((subMenu: any, otroindex: number) => (
                  <li key={"sub" + otroindex}>
                    <Link to={subMenu.route}>
                      <i className={subMenu.icon}></i>
                      <span>{subMenu.name}</span>
                    </Link>
                  </li>
                  
                ))}
              </ul>
            </li>
            
          ) : (
            <li className="nav-item" key={index}>
              <Link to={option.route} className="nav-link collapsed">
                <i className={option.icon}></i>
                <span>{option.name}</span>
                
              </Link>
            </li>
            
          )
        )}
        
      </ul>
    </aside>
  );
};
