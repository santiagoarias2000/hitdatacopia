import { Response } from "express";
import pool from "../../config/connection/connectionDB";

class UserDAO_Update{
    public static async actualizarUser( sqlConfirmar: string, sqlActualizarYa: string, parametros: any, res: Response): Promise<any> {
        await pool.task(async consulta => {
            const dato = await consulta.one(sqlConfirmar, parametros);
            if (dato.amount == 0) {
                return await consulta.one(sqlActualizarYa, parametros);
            } else {
                return { id_user: 0 };
            }
        })
            .then((respuesta) => {
                if (respuesta.id_user != 0) {
                    res.status(200).json({ OK: 'Usuario Creado'})
                } else {
                    console.log(respuesta)
                    res.status(402).json({ err: 'Error creando registro, probablmente este el email repetido' });
                }
            })
            .catch((mierror) => {
                console.log(mierror);
                res.status(400).json({ info: 'Error en las consultas ', mierror });
            });
    }

}
export default UserDAO_Update;