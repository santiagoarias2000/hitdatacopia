import { SQL_VEHICLE_CREATE } from '../../repo/vehiclesRepository/sql_create';
import { Request, Response } from "express";
import VehicleCreate from '../../dao/vehiclesDAO/CreateDAO';

class VehicleControllerCreate extends VehicleCreate {
  public createMeVehicle(req: Request, res: Response): void {
    const type_vehicle = req.body.typeVehicle;
    const license_plate = req.body.licensePlate;
    const expiration_soat  = req.body.expirationSoat;
    const expiration_tecnomechanic  = req.body.expirationTecnomechanic;
    
    const parameter = [type_vehicle, license_plate, expiration_soat,expiration_tecnomechanic ];

    VehicleControllerCreate.createVehicle(
      SQL_VEHICLE_CREATE.CREATE,
      SQL_VEHICLE_CREATE.CONFIRMARVEHICLE,
      parameter,
      res
    );
  }
}
const vehicleControllerCreate = new VehicleControllerCreate();
export default vehicleControllerCreate;