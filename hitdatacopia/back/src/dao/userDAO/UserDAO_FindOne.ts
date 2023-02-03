import { Response } from "express";
import pool from "../../config/connection/connectionDB";

class UserDAO_FindOne {
    protected static async findUserById(sqlSearch: string, parametres: any, res: Response): Promise<any> {

        await pool.one(sqlSearch, parametres)
            .then((dato) => {
                console.log(dato);
                return res.status(200).json(dato);
            })
            .catch((mierror) => {
                console.log(mierror)
                return res.status(400).json({ msg: 'Error buscando user' });
            });
    }

}
export default UserDAO_FindOne;
