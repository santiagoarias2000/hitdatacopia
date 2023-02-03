import { Router } from 'express';
import vehiclesControllerCreate from '../controller/vehicleController/CreateController';
import vehicleControllerDelete from '../controller/vehicleController/DeleteController';
import vehicleControllerDetails from '../controller/vehicleController/DetailsController';
import vehicleControllerGet from '../controller/vehicleController/ToListController';
import vehicleControllerUpdate from '../controller/vehicleController/UpdateController';

class VehiclesRoutes{
    public routesApiVehicles: Router;
    constructor(){
        this.routesApiVehicles = Router();
        this.setting();
    }
    public setting(){
        this.routesApiVehicles.get("/view", vehicleControllerGet.getMeVehicles);
        this.routesApiVehicles.post( "/create", vehiclesControllerCreate.createMeVehicle );
        this.routesApiVehicles.get( "/details/:idVehicle", vehicleControllerDetails.DetailsOne );
        this.routesApiVehicles.delete( "/delete/:idVehicle", vehicleControllerDelete.deleteVehicles );
        this.routesApiVehicles.put( "/update/:idVehicle", vehicleControllerUpdate.updateVehicle );
    }

}
const vehiclesRoutes = new VehiclesRoutes();
export default vehiclesRoutes.routesApiVehicles;