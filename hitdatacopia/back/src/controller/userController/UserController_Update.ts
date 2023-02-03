import { Request, Response } from "express";
import UserDAO_Update from "../../dao/userDAO/UserDAO_Update";
import { SQL_USER_UPDATE } from "../../repo/userRepository/user_update_sql";

class UserController_Update extends UserDAO_Update{
    public updateUser(req: Request, res: Response): void {
        const idUser = req.body.idUser;
        const fullName = req.body.fullName;
        const emailUser = req.body.emailUser;
        const stateUser = req.body.stateUser;
        const passwordUser = req.body.passwordUser;
        const idProfile = req.body.idProfile;
        const dateUser = req.body.dateUser;
        const parametres = [idUser,fullName, emailUser, stateUser,idProfile, passwordUser, dateUser];
        UserController_Update.actualizarUser(SQL_USER_UPDATE.UPDATE_CONFIRM,SQL_USER_UPDATE.UPDATE,parametres, res);
    }

}
const userController_Update = new UserController_Update();
export default userController_Update;