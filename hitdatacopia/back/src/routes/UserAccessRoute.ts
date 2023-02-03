import { Router } from "express";
import userController from "../controller/userController/UserController";


class AccessRoutes {
    public routesAccessApi: Router;
    constructor() {
        this.routesAccessApi = Router();
        this.configuracion();
    }
    public configuracion(){
        this.routesAccessApi.post("/login", userController.findTheAccessUser);
    }
}

const accessRoutes = new AccessRoutes();
export default accessRoutes.routesAccessApi;