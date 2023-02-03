import { Response } from 'express';
import pool from "../../config/connection/connectionDB";


class CoursesCreate{
    public static async createCourse( sqlCreate: string, sqlConfirm:string, parameter: any, res: Response): Promise<any> {
        await pool
            .task(async consult => {
                //Aca vamos hacer las consultas
                const dato = await consult.one(sqlConfirm, parameter);
                if (dato.amount == 0) {
                    return await consult.one(sqlCreate, parameter);
                } else {
                    return { id_course: 0 };
                }
            })
            .then((response) => {
                if (response.id_course != 0) {
                    res.status(200).json({ OK: 'Course created SUCCESSFULLY', newCode: response.id_course });
                } else {
                    res.status(402).json({ ERROR: 'Error create register it is repeated' })
                };
            })
            .catch((meErr) => {
                console.log('Error in daos: ', meErr);
                res.status(400).json({ answer: 'Error creating course information.' });
            });
    } 
}
export default CoursesCreate;