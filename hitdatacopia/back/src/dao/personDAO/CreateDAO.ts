import { Response } from 'express';
import pool from "../../config/connection/connectionDB";


class PersonCreate{
    public static async createPerson( sqlConfirm:string,sqlCreate: string, parameter: any, res: Response): Promise<any> {
        console.log(parameter);
        await pool
        .task(async consult => {
            //Aca vamos hacer las consults
            const data = await consult.one(sqlConfirm, parameter);
            if (data.amount == 0) {
                return await consult.one(sqlCreate, parameter);
            } else {
                return { id_person: 0 };
            }
        })
        .then((answer) => {
            //Aca va si todo esta bien
            if (answer.id_person != 0) {
                res.status(200).json({ ok: 'Person created', newCode: answer.id_person });
            } else {
                res.status(402).json({ err: 'Error, numero de cedula de la person ya Esta creado', newCode: answer.id_person });
            }
        })
        .catch((miError) => {
            console.log('Error, consult no se realizo con exito', miError);
            res.status(400).json({ answers: 'Error en la consult' });

        });
    } 
}
export default PersonCreate;