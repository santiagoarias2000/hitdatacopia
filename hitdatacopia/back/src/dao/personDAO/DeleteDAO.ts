import { Response } from "express";
import pool from "../../config/connection/connectionDB";

class PersonDelete {
    protected static async deleteById(sqlSearch: string, params: any, res: Response): Promise<any> {
        console.log(params);
        await pool.result(sqlSearch, params)
            .then((dato)=>{
                console.log(dato);
                return res.status(200).json({ok: 'Usuario eliminado'});
            })
            .catch((miError)=>{
                console.log(miError);
                return res.status(400).json({answer: 'Error to delete from PersonDelete.ts'});
            });
    }
}
export default PersonDelete;