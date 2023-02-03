import { Router } from "express";
import userController_Create from "../controller/userController/UserController_Create";
import userController_Delete from "../controller/userController/UserController_Delete";

import userController_List from "../controller/userController/UserController_List";
import userController_Search from "../controller/userController/UserController_Search";
import userController_Update from "../controller/userController/UserController_Update";


class UserRoutes {
  public routesApiUser: Router;
  constructor() {
    this.routesApiUser = Router();
    this.setting();
  }
  public setting() {
    this.routesApiUser.get("/list", userController_List.giveMeUsersList);
    this.routesApiUser.get("/one/:idUser", userController_Search.searchUser);
    this.routesApiUser.post("/create", userController_Create.createUser);
    this.routesApiUser.put("/update/:idUser", userController_Update.updateUser);
    this.routesApiUser.delete("/delete/:idUser", userController_Delete.deleteUser);
    
  }
}
const userRoutes = new UserRoutes();
export default userRoutes.routesApiUser;