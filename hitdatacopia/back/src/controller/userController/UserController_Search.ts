import { SQL_USER_SEARCH_ONE } from './../../repo/userRepository/user_search_one_sql';
import { Request, Response } from "express";
import UserDAO_FindOne from "../../dao/userDAO/UserDAO_FindOne";

class UserController_Search extends UserDAO_FindOne{
    public searchUser(req: Request, res: Response): void {
        const idUser = req.params.idUser;
        const parametres = [idUser];
        UserController_Search.findUserById(SQL_USER_SEARCH_ONE.FIND_ONE, parametres, res);
    }

}
const userController_Search= new UserController_Search();
export default userController_Search;