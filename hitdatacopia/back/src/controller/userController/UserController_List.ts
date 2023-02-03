import { Request,Response } from "express";
import UserDAO_List from "../../dao/userDAO/UserDAO_List";
import { SQL_USER_LIST } from "../../repo/userRepository/user_list_sql";

class UserController_List extends UserDAO_List{
    public giveMeUsersList(req:Request, res: Response):void{
        UserController_List.giveMeAllUsers(SQL_USER_LIST.LIST,[],res);
    }
    

}
const userController_List = new UserController_List();
export default  userController_List;