export const SQL_PERSON_CREATE = {
  CREATEPERSON:
    "INSERT INTO person(first_name,second_name,first_last_name,second_last_name,phone,date_birth,address,occupation,type_document,document_number,place_expedition,gender,type_blood,status_civil,stratum,sisben,level_education,certificate,state_tuition,date_tuition,email,photo,photo64,photo_fingerprint,photo_fingerprint64, id_vehicle, id_course) \
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)\
     RETURNING id_person",
  CONFRIMPERSON:
    "SELECT COUNT(p.id_person) AS amount\
    FROM person p \
    WHERE lower(p.document_number)=lower($10)"
};
