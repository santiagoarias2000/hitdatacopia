import { Response } from "express";
import pool from "../../config/connection/connectionDB";
class UserDAO_Create{

    public static async crearUser(sqlConfirm: string, sqlCreate: string, parametres: any, res: Response): Promise<any> {
        await pool.task(async consult => {
            const dato = await consult.one(sqlConfirm, parametres);
            if (dato.amount == 0) {
                return await consult.one(sqlCreate, parametres);
            } else {
                return { id_user: 0 };
            }
        })
            .then((answer) => {
                if (answer.id_user != 0) {
                    res.status(200).json({ answer: 'Usuario Creado', nuevoCodigo: answer.id_user })
                } else {
                    console.log(answer)
                    res.status(402).json({ error: 'Error creando registro, probablmente este repetido' });
                }
            })
            .catch((mierror) => {
                console.log(mierror);
                res.status(400).json({ error: 'Error en las consults ', mierror });
            });
    }
}
export default UserDAO_Create;