import { Response } from 'express';
import pool from '../../config/connection/connectionDB';
class PersonToListPDF{
    public static async getPerson(sqlPDF:string, parameter:any, res: Response): Promise<any>{
        await pool.result(sqlPDF, parameter)
        .then((result)=>{
            res.status(200).json(result.rows);
        })
        .catch((myErr)=>{
            console.log('Error in daos: ', myErr);
            res.status(400).json({respuesta:'No esta trabajando el daos en el ToList de persona'});
        });
    }
}
export default PersonToListPDF;