import { Response } from "express";
import pool from "../../config/connection/connectionDB";

class VehicleUpdate {
  public static async updateVehicle(
    sqlUpdate: string,
    sqlConfirm: string,
    parameter: any,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consult) => {
        //Aca vamos hacer las consultas
        const dato = await consult.one(sqlConfirm, parameter);
        if (dato.amount == 0) {
          return await consult.one(sqlUpdate, parameter);
        } else {
          return { id_vehicle: 0 };
        }
      })
      .then((response) => {
        if (response.id_vehicle != 0) {
          console.log(response);
          res.status(200).json({ OK: "Vehicle update SUCCESSFULLY" });
        } else {
          res
            .status(402)
            .json({ ERROR: "Error update register it is repeated" });
        }
      })
      .catch((meErr) => {
        console.log("Error in daos: ", meErr);
        res.status(400).json({ answer: "Error creating vehicle information." });
      });
  }
}
export default VehicleUpdate;
