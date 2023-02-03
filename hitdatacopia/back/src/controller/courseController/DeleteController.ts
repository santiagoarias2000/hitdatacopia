import { SQL_COURSE_DELETE } from './../../repo/courseRepository/sql_delete';
import { Request, Response } from "express";
import CourseDelete from "../../dao/courseDAO/DeleteDAO";



class CourseControllerDelete extends CourseDelete {
    public deleteCourse(req: Request, res: Response): void{
        const id_course = req.params.idCourse;
        const parametro = [id_course];
        CourseControllerDelete.deleteById(SQL_COURSE_DELETE.DELETE,parametro, res);
    }
}
const courseControllerDelete = new CourseControllerDelete();
export default courseControllerDelete;