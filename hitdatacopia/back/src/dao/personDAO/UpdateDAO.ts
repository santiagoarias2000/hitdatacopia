import { Response } from "express";
import pool from "../../config/connection/connectionDB";

class PersonUpdate {
    public static async updatePerson(sqlConfirm: string, sqlUpdate: string, paramentros: any, res: Response): Promise<any> {
        await pool.task(async consult => {
            //Aca vamos hacer las consults
            const dato = await consult.one(sqlConfirm, paramentros);
            if (dato.amount == 0) {
                return await consult.one(sqlUpdate, paramentros);
            } else {
                return { id_person: 0 };
            }
        })
            .then((respuesta) => {
                if(respuesta.id_person !=0){
                console.log(respuesta);
                res.status(200).json({ ok: 'Usuario actualizado'});
            }else{
                console.log(respuesta);
                res.status(402).json({err:'Error, no es posible actualizar el usuario. El numero de documento del usuario ya esta asociado'});
            }
            })
            .catch((miError) => {
                console.log(miError);
                res.status(400).json({ help: 'Error en actualizar usuario' });

            });
    }

}
export default PersonUpdate;