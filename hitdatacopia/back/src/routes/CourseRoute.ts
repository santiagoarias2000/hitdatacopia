import { Router } from 'express';
import courseControllerCreate from '../controller/courseController/CreateController';
import courseControllerDelete from '../controller/courseController/DeleteController';
import courseControllerDetails from '../controller/courseController/DetailsController';
import courseControllerGet from '../controller/courseController/ToListController';
import courseControllerUpdate from '../controller/courseController/UpdateController';

class CourseRoutes{
    public routesApiCourses: Router;
    constructor(){
        this.routesApiCourses = Router();
        this.setting();
    }
    public setting(){
        this.routesApiCourses.get("/view", courseControllerGet.getMeCourse);
        this.routesApiCourses.post( "/create", courseControllerCreate.createMeCourse );
        this.routesApiCourses.get( "/details/:idCourse", courseControllerDetails.DetailsOne );
        this.routesApiCourses.delete( "/delete/:idCourse", courseControllerDelete.deleteCourse );
        this.routesApiCourses.put( "/update/:idCourse", courseControllerUpdate.updateCourse );
    }

}
const courseRoutes = new CourseRoutes();
export default courseRoutes.routesApiCourses;