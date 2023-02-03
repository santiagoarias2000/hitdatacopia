import { SQL_PERSON_VIEW } from './../../repo/personRepository/sql_toList';
import { Request } from 'express';
import { Response } from 'express';
import PersonToList from '../../dao/personDAO/ToList';


class PersonControllerGet extends PersonToList{
    public getMePerson(req: Request, res: Response): void{
        PersonControllerGet.getPerson(SQL_PERSON_VIEW.VIEW,[],res);
    }
}
const personControllerGet = new PersonControllerGet();
export default personControllerGet;