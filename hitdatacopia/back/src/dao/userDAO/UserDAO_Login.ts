import { json, Response } from "express";
import pool from "../../config/connection/connectionDB";
import UserAccessAnswer from "../userAccessDAO/UserAccessAnswer";

class UserDAO_Login {
        protected static async findIdUserAccess(sqlSearch: string, parameters:any, res:Response):Promise<any>{
            await pool.oneOrNone(sqlSearch,parameters)
            .then((result)=>{
                return UserAccessAnswer.process(result,res);
            })
            .catch((error)=>{
                console.log(error);
                return res.status(400).json({miError:'Error buscando el acceso'});
                
            });
        }

}
export default UserDAO_Login;