import { SQL_PERSON_FILTER } from './../../repo/personRepository/sql_filterCertificate';
import { SQL_PERSON_VIEW } from './../../repo/personRepository/sql_toList';
import { Request } from 'express';
import { Response } from 'express';
import PersonFilterCertificate from '../../dao/personDAO/FilterDAO';


class PersonControllerFilter extends PersonFilterCertificate{
    public filterPersonCertificate(req: Request, res: Response): void{
        PersonControllerFilter.getPerson(SQL_PERSON_FILTER.FILTERCERTIFICATE,[],res);
    }
    public filterPersonNoCertificate(req: Request, res: Response): void{
        PersonControllerFilter.getPerson(SQL_PERSON_FILTER.FILTERNOCERTIFICATE,[],res);
    }
    
}
const personControllerFilterC = new PersonControllerFilter();
export default personControllerFilterC;