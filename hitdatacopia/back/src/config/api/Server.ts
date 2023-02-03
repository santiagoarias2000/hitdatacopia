import cors from "cors";
import morgan from "morgan";
import express from "express";

import PersonRoutes from "../../routes/PersonRoute";
import RolesRoutes from "../../routes/RoleRoute";
import UserRoutes from "../../routes/UserRoute";
import VehiclesRoutes from "../../routes/VehicleRoute";
import UserAccessRoutes from "../../routes/UserAccessRoute";
import CourseRoutes from "../../routes/CourseRoute";
import safety from "../../middleware/Safety";

class Server {
    public app: express.Application;

    constructor(){
        this.app = express();
        this.startSetting();
        this.activeRoute();
    }

    public startSetting(): void{
        this.app.set("PORT", 3123);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({limit:"100mb"}));
        this.app.use(express.urlencoded({extended:true}));
    }

    public activeRoute():void{
        this.app.use('/api/public', UserAccessRoutes);
        this.app.use('/api/private/person',safety.verificarToken, PersonRoutes);
        this.app.use('/api/private/course',safety.verificarToken, CourseRoutes);
        this.app.use('/api/private/roles',safety.verificarToken, RolesRoutes);
       
        
        this.app.use('/api/public/user', UserAccessRoutes);
        this.app.use('/api/private/user',safety.verificarToken,UserRoutes);
       
        this.app.use('/api/private/vehicle',safety.verificarToken, VehiclesRoutes);
    }

    public start(): void {
        this.app.listen(this.app.get("PORT"),()=>{
            console.log("It works", this.app.get("PORT"));
        });
    }
}
export default Server;