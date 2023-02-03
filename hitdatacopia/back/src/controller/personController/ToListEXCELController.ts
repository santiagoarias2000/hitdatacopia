import { SQL_PERSON_VIEW } from '../../repo/personRepository/sql_toListEXCEL';
import { Request } from 'express';
import { Response } from 'express';
import PersonToList from '../../dao/personDAO/ToListPDF';
import { SQL_PERSON_FILTER } from '../../repo/personRepository/sql_filterCertificate';


class PersonControllerGetEXCEL extends PersonToList{
    public getMePerson(req: Request, res: Response): void{
        PersonControllerGetEXCEL.getPerson(SQL_PERSON_VIEW.VIEW_EXCEL,[],res);
    }
    public filterPersonCertificateEXCEL(req: Request, res: Response): void{
        PersonControllerGetEXCEL.getPerson(SQL_PERSON_VIEW.VIEW_CERTIFICADO,[],res);
    }
    public filterPersonNoCertificateEXCEL(req: Request, res: Response): void{
        PersonControllerGetEXCEL.getPerson(SQL_PERSON_VIEW.VIEW_NO_CERTIFICADO,[],res);
    }
}
const personControllerGetEXCEL = new PersonControllerGetEXCEL
export default personControllerGetEXCEL