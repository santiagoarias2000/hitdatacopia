export const SQL_COURSE_CREATE = {
  CREATE:
    "INSERT INTO course(type_course,time_course,price) values($1, $2, $3) RETURNING id_course",
  CONFIRMCOURSE:
    "SELECT COUNT(cou.id_course) AS amount\
    FROM course cou \
    WHERE lower(cou.type_course)=lower($1)",
};
