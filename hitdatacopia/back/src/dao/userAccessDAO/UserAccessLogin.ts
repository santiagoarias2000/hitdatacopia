import { json, Response } from "express";
import UserAccessAnswer from "./UserAccessAnswer";
import pool from "../../config/connection/connectionDB";

class UserAccessLogin{
    protected static async searchIdAccess(sqlSearch: string, parametros: any, res: Response): Promise<any> {

        await pool.oneOrNone(sqlSearch, parametros)
            .then((dato) => {
               return UserAccessAnswer.process(dato,res);
            })
            .catch((mierror) => {
                console.log(mierror)
                return res.status(400).json({ msg: 'Error buscando acceso' });
            });
    }

}
export default UserAccessLogin