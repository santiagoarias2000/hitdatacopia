import { SQL_VEHICLES_VIEW } from './../../repo/vehiclesRepository/sql_toList';
import { Request } from 'express';
import { Response } from 'express';
import VehiclesToList from '../../dao/vehiclesDAO/ToList';


class VehicleControllerGet extends VehiclesToList{
    public getMeVehicles(req: Request, res: Response): void{
        VehicleControllerGet.getVehicles(SQL_VEHICLES_VIEW.VIEW,[],res);
    }
}
const vehicleControllerGet = new VehicleControllerGet();
export default vehicleControllerGet;