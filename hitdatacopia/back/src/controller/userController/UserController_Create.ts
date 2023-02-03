import { SQL_USER_CREATE } from './../../repo/userRepository/user_create_sql';
import { Request,Response } from "express";
import UserDAO_Create from "../../dao/userDAO/UserDAO_Create";

class UserController_Create extends UserDAO_Create{
    public createUser(req: Request, res: Response): void {
        const fullName = req.body.fullName;
        const emailUser = req.body.emailUser;
        const stateUser = req.body.stateUser;
        const idProfile = req.body.idProfile;
        const passwordUser = req.body.passwordUser;
        const dateUser = req.body.dateUser;
        
        const parametres = [fullName, emailUser, stateUser,idProfile ,passwordUser, dateUser];
        UserController_Create.crearUser(SQL_USER_CREATE.CONFIRM,SQL_USER_CREATE.CREATE,parametres,res);
    }

} 
const userController_Create = new UserController_Create();
export default userController_Create;