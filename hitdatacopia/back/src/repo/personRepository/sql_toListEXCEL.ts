export const SQL_PERSON_VIEW = {
  VIEW_EXCEL:
    "SELECT ps.id_person,ps.first_name,ps.second_name,ps.first_last_name,ps.second_last_name,ps.phone,ps.date_birth,ps.address,ps.occupation,ps.type_document,ps.document_number,ps.place_expedition,ps.gender,ps.type_blood,ps.status_civil,ps.stratum,ps.sisben,ps.level_education,ps.certificate,ps.state_tuition,ps.date_tuition,ps.email\
        FROM person ps \
        INNER JOIN course cour ON cour.id_course = ps.id_course \
        INNER JOIN vehicle veh ON veh.id_vehicle = ps.id_vehicle \
        ORDER BY ps.first_name ASC",
  VIEW_CERTIFICADO:
    "SELECT ps.id_person,ps.first_name,ps.second_name,ps.first_last_name,ps.second_last_name,ps.phone,ps.date_birth,ps.address,ps.occupation,ps.type_document,ps.document_number,ps.place_expedition,ps.gender,ps.type_blood,ps.status_civil,ps.stratum,ps.sisben,ps.level_education,ps.certificate,ps.state_tuition,ps.date_tuition,ps.email\
        FROM person ps \
        INNER JOIN course cour ON cour.id_course = ps.id_course \
        INNER JOIN vehicle veh ON veh.id_vehicle = ps.id_vehicle \
        WHERE ps.certificate = 'CERTIFICADO' \
        ORDER BY ps.first_name ASC",
  VIEW_NO_CERTIFICADO:
    "SELECT ps.id_person,ps.first_name,ps.second_name,ps.first_last_name,ps.second_last_name,ps.phone,ps.date_birth,ps.address,ps.occupation,ps.type_document,ps.document_number,ps.place_expedition,ps.gender,ps.type_blood,ps.status_civil,ps.stratum,ps.sisben,ps.level_education,ps.certificate,ps.state_tuition,ps.date_tuition,ps.email\
        FROM person ps \
        INNER JOIN course cour ON cour.id_course = ps.id_course \
        INNER JOIN vehicle veh ON veh.id_vehicle = ps.id_vehicle \
        WHERE ps.certificate = 'NO CERTIFICADO' \
        ORDER BY ps.first_name ASC",
};
