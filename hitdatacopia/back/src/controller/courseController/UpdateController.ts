import { SQL_COURSE_UPDATE } from "./../../repo/courseRepository/sql_update";
import { Response, Request } from "express";
import CourseUpdate from "../../dao/courseDAO/UpdateDAO";

class CourseControllerUpdate extends CourseUpdate {
  public updateCourse(req: Request, res: Response): void {
    const id_course = req.body.idCourse;
    const type_course = req.body.typeCourse;
    const time_course = req.body.timeCourse;
    const price = req.body.price;
    const parameter = [id_course, type_course, time_course, price];
    CourseControllerUpdate.updateCourse(
      SQL_COURSE_UPDATE.UPDATE,
      SQL_COURSE_UPDATE.CONFIRMCOURSE,
      parameter,
      res
    );
  }
}
const courseControllerUpdate = new CourseControllerUpdate();
export default courseControllerUpdate;
