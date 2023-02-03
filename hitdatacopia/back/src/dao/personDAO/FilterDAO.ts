import { Response } from 'express';
import pool from '../../config/connection/connectionDB';
class PersonFilterCertificate{
    public static async getPerson(sqlConsult: string, parameter:any, res: Response): Promise<any>{
        await pool.result(sqlConsult, parameter)
        .then((result)=>{
            res.status(200).json(result.rows);
        })
        .catch((myErr)=>{
            console.log('Error in daos: ', myErr);
            res.status(400).json({respuesta:'No esta filtrando la persona por el certificado'});
        });
    }
}
export default PersonFilterCertificate;