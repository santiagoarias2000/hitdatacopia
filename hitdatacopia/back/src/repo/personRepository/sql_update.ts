export const SQL_PERSON_UPDATE = {
  CONFIRMPERSON:"SELECT COUNT(per.id_person) AS amount \
  FROM person per\
  WHERE lower(per.document_number)=lower($11) AND per.id_person <>$1",

  UPDATE:
    "UPDATE person SET  first_name=$2,second_name=$3,first_last_name=$4,second_last_name=$5,phone=$6,date_birth=$7,address=$8,occupation=$9,type_document=$10,document_number=$11,place_expedition=$12,gender=$13,type_blood=$14,status_civil=$15,stratum=$16,sisben=$17,level_education=$18,certificate=$19,state_tuition=$20,date_tuition=$21,email=$22,photo=$23,photo64=$24,photo_fingerprint=$25,photo_fingerprint64=$26, id_vehicle=$27, id_course=$28\
    WHERE id_person = $1 \
    RETURNING id_person"
};
