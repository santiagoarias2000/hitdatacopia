import { Request, Response } from "express";
import UserDAO_Delete from "../../dao/userDAO/UserDAO_Delete";
import { SQL_USER_DELETE } from "../../repo/userRepository/user_delete_sql";

class UserController_Delete extends UserDAO_Delete{
    public deleteUser(req:Request,res:Response):void{
        const idUser = req.params.idUser;
        const parametro = [idUser];
        UserController_Delete.deleteUserById(SQL_USER_DELETE.DELETE,parametro,res);
    }

}
const userController_Delete = new UserController_Delete();
export default userController_Delete;