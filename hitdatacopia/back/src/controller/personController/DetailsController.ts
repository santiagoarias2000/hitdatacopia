import { SQL_PERSON_DETAILS } from "./../../repo/personRepository/sql_details";
import { Request, Response } from "express";
import PersonDetails from "../../dao/personDAO/DetailsDAO";

class PersonControllerDetails extends PersonDetails {
  public DetailsOne(req: Request, res: Response): void {
    const id_person = req.params.idPerson;
    const parametro = [id_person];
    
    PersonControllerDetails.detailsById(
      SQL_PERSON_DETAILS.DETAILS,
      parametro,
      res
    );
  }
}
const personControllerDetails = new PersonControllerDetails();
export default personControllerDetails;
