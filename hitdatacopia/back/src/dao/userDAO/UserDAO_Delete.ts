import { Response } from "express";

import pool from "../../config/connection/connectionDB";

class UserDAO_Delete{
    protected static async deleteUserById(sqlSearch: string, parametres: any, res: Response): Promise<any> {

        await pool.result(sqlSearch, parametres)
            .then((dato) => {
                console.log(dato);
                res.status(200).json({ OK: "Usuario Eliminado con Éxito"});
            })
            .catch((mierror) => {
                console.log(mierror)
                return res.status(400).json({ answer: 'Error borrando UsuarioDao' });
            });
    }

}
export default UserDAO_Delete;