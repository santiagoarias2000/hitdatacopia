import { Request, Response } from "express";
import VehiclesDetails from "../../dao/vehiclesDAO/DetailsDAO";
import { SQL_VEHICLES_DETAILS } from "../../repo/vehiclesRepository/sql_details";

class VehicleControllerDetails extends VehiclesDetails{
    public DetailsOne(req: Request, res: Response): void{
        const id_vehicle = req.params.idVehicle;
        const parametro = [id_vehicle];
        VehicleControllerDetails.detailsById(SQL_VEHICLES_DETAILS.DETAILS,parametro, res);
    } 
}
const vehicleControllerDetails = new VehicleControllerDetails();
export default vehicleControllerDetails;