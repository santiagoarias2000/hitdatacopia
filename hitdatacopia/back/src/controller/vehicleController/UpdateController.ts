import { SQL_VEHICLES_UPDATE } from "./../../repo/vehiclesRepository/sql_update";
import { Response, Request } from "express";
import VehicleUpdate from "../../dao/vehiclesDAO/UpdateDAO";

class VehicleControllerUpdate extends VehicleUpdate {
  public updateVehicle(req: Request, res: Response): void {
    const id_vehicle = req.body.idVehicle;
    const type_vehicle = req.body.typeVehicle;
    const license_plate = req.body.licensePlate;
    const expiration_soat = req.body.expirationSoat;
    const expiration_tecnomechanic = req.body.expirationTecnomechanic;
    const parameter = [
      id_vehicle,
      type_vehicle,
      license_plate,
      expiration_soat,
      expiration_tecnomechanic,
    ];

    VehicleControllerUpdate.updateVehicle(
      SQL_VEHICLES_UPDATE.UPDATE,
      SQL_VEHICLES_UPDATE.CONFIRMARVEHICLE,
      parameter,
      res
    );
  }
}
const vehicleControllerUpdate = new VehicleControllerUpdate();
export default vehicleControllerUpdate;
