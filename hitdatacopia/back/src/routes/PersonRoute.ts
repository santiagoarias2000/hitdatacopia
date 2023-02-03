import { Router } from "express";
import personControllerCreate from "../controller/personController/CreateController";
import personControllerDelete from "../controller/personController/DeleteController";
import personControllerDetails from "../controller/personController/DetailsController";
import personControllerFilterC from "../controller/personController/FilterController";
import personControllerGet from "../controller/personController/ToListController";
import personControllerGetEXCEL from "../controller/personController/ToListEXCELController";
import personControllerUpdate from "../controller/personController/UpdateController";

class PersonRoutes {
  public routesApiPerson: Router;
  constructor() {
    this.routesApiPerson = Router();
    this.setting();
  }
  public setting() {
    this.routesApiPerson.get("/view", personControllerGet.getMePerson);
    this.routesApiPerson.post("/create", personControllerCreate.createMePerson);
    this.routesApiPerson.get( "/details/:idPerson", personControllerDetails.DetailsOne );
    this.routesApiPerson.get( "/detailsEXCEL", personControllerGetEXCEL.getMePerson);
    this.routesApiPerson.get( "/detailsCertificateEXCEL", personControllerGetEXCEL.filterPersonCertificateEXCEL);
    this.routesApiPerson.get( "/detailsNoCertificateEXCEL", personControllerGetEXCEL.filterPersonNoCertificateEXCEL);
    this.routesApiPerson.get( "/filtercertificate", personControllerFilterC.filterPersonCertificate );
    this.routesApiPerson.get( "/filternocertificate", personControllerFilterC.filterPersonNoCertificate );
    this.routesApiPerson.delete( "/delete/:idPerson", personControllerDelete.deletePerson );
    this.routesApiPerson.put( "/update/:idPerson", personControllerUpdate.updatePerson );
    //falta colocar el id
    // this.routesApiPerson.get( "/pdf",personControllerDetails.createPDF  );
  }
}
const personRoutes = new PersonRoutes();
export default personRoutes.routesApiPerson;
