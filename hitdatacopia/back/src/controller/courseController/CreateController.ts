import { SQL_COURSE_CREATE } from './../../repo/courseRepository/sql_create';
import { Request, Response } from "express";
import CourseCreate from "../../dao/courseDAO/CreateDAO";

class CourseControllerCreate extends CourseCreate {
  public createMeCourse(req: Request, res: Response): void {
    const type_course = req.body.typeCourse;
    const time_course = req.body.timeCourse;
    const price = req.body.price;
    const parameter = [type_course,time_course,price];

    CourseControllerCreate.createCourse(
      SQL_COURSE_CREATE.CREATE,
      SQL_COURSE_CREATE.CONFIRMCOURSE,
      parameter,
      res
    );
  }
}
const courseControllerCreate = new CourseControllerCreate();
export default courseControllerCreate;
