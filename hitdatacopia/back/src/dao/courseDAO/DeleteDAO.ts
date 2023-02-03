import { Response } from "express";
import pool from "../../config/connection/connectionDB";

class CourseDelete {
    protected static async deleteById(sqlSearch: string, params: any, res: Response): Promise<any> {
        await pool.result(sqlSearch, params)
            .then((dato)=>{
                console.log(dato);
                return res.status(200).json({OK : 'Course remove SUCCESSFULLY'});
            })
            .catch((miError)=>{
                console.log(miError);
                return res.status(400).json({answer: 'Error to delete from CourseDelete.ts'});
            });
    }
}
export default CourseDelete;