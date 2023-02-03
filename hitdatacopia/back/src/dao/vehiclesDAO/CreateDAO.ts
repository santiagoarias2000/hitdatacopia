import { Response } from 'express';
import pool from "../../config/connection/connectionDB";


class VehicleCreate{
    public static async createVehicle( sqlCreate: string, sqlConfirm:string, parameter: any, res: Response): Promise<any> {
        console.log(parameter);
        await pool
            .task(async consult => {
                //Aca vamos hacer las consultas
                const dato = await consult.one(sqlConfirm, parameter);
                if (dato.amount == 0) {
                    return await consult.one(sqlCreate, parameter);
                } else {
                    return { id_vehicle: 0 };
                }
            })
            .then((response) => {
                if (response.id_vehicle != 0) {
                    res.status(200).json({ OK: 'Vehicle created SUCCESSFULLY', newCode: response.id_vehicle });
                } else {
                    res.status(402).json({ ERROR: 'Error create register it is repeated' })
                };
            })
            .catch((meErr) => {
                console.log('Error in daos: ', meErr);
                res.status(400).json({ answer: 'Error creating vehicle information.' });
            });
    } 
}
export default VehicleCreate;