import { SQL_PERSON_CREATE } from './../../repo/personRepository/sql_create';
import { Request, Response } from "express";
import PersonCreate from "../../dao/personDAO/CreateDAO";

class PersonControllerCreate extends PersonCreate {
  public createMePerson(req: Request, res: Response): void {
    const first_name = req.body.firstName;
    const second_name = req.body.secondName;
    const first_last_name = req.body.firstLastName;
    const second_last_name = req.body.secondLastName;
    const phone = req.body.phone;
    const date_birth = req.body.dateBirth;
    const address = req.body.address;
    const occupation = req.body.occupation;
    const type_document = req.body.typeDocument;
    const document_number = req.body.documentNumber;
    const place_expedition = req.body.placeExpedition;
    const gender = req.body.gender;
    const type_blood = req.body.typeBlood;
    const status_civil = req.body.statusCivil;
    const stratum = req.body.stratum;
    const sisben = req.body.sisben;
    const level_education = req.body.levelEducation;
    const certificate = req.body.certificate;
    const state_tuition = req.body.stateTuition;
    const date_tuition = req.body.dateTuition;
    const email = req.body.email;
    const photo = req.body.photo;
    const photo64 = req.body.photo64;
    const photo_fingerprint = req.body.photoFingerprint;
    const photo_fingerprint64 = req.body.photoFingerprint64;
    const id_vehicle = req.body.vehicle;
    const id_course = req.body.course;
    const parameter = [first_name,second_name,first_last_name,second_last_name,phone,date_birth,address,occupation,type_document,document_number,place_expedition,gender,type_blood,status_civil,stratum,sisben,level_education,certificate,state_tuition,date_tuition,email,photo,photo64,photo_fingerprint,photo_fingerprint64,id_vehicle, id_course];

    PersonControllerCreate.createPerson(SQL_PERSON_CREATE.CONFRIMPERSON, SQL_PERSON_CREATE.CREATEPERSON, parameter, res);
  }
}
const personControllerCreate = new PersonControllerCreate();
export default personControllerCreate;
