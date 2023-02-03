import { SQL_COURSE_DETAILS } from "./../../repo/courseRepository/sql_details";
import { Request, Response } from "express";
import CourseDetails from "../../dao/courseDAO/DetailsDAO";

class CourseControllerDetails extends CourseDetails {
  public DetailsOne(req: Request, res: Response): void {
    const id_course = req.params.idCourse;
    const parametro = [id_course];
    
    CourseControllerDetails.detailsById(
      SQL_COURSE_DETAILS.DETAILS,
      parametro,
      res
    );
  }
  public DetailsOneUpdate(req: Request, res: Response): void {
    const id_course = req.params.idCourse;
    const parametro = [id_course];
    CourseControllerDetails.detailsById(
      SQL_COURSE_DETAILS.DETAILSUPPDATE,
      parametro,
      res
    );
  }
}
const courseControllerDetails = new CourseControllerDetails();
export default courseControllerDetails;
