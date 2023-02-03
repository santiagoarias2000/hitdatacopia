import { Response } from "express";
import pool from "../../config/connection/connectionDB";

class UserDAO_List {
    public static async giveMeAllUsers(sqlConsult: string, parametres: any, res: Response): Promise<any> {
        pool.result(sqlConsult, parametres)
            .then((data) => {
                res.status(200).json(data.rows);
            })
            .catch((error) => {
                console.log('Error in DAOS', error);;
                res.status(401).json({ msg: 'Algo salió mal al Listar' });

            })
    }

}
export default UserDAO_List;