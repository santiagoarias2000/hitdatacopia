import { Request } from 'express';
import { Response } from 'express';
import UserDAO_Login from '../../dao/userDAO/UserDAO_Login';
import * as encriptar from "js-sha512";
import { SQL_USER_SEARCH_ONE } from '../../repo/userRepository/user_search_one_sql';

class UserController extends UserDAO_Login{
    public findTheAccessUser(req:Request, res:Response):void{
        const emailUser = req.body.emailUser;
        const password = req.body.passwordUser;
        //const passwordEncypted = encriptar.sha512(password.passwordUser);
        const parameter = [emailUser, password];
        UserController.findIdUserAccess(SQL_USER_SEARCH_ONE.LOGIN, parameter, res);
    }
}
const userController = new UserController();
export default userController;