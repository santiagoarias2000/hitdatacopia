export const SQL_COURSE_UPDATE = {
  UPDATE:
    "UPDATE course SET  type_course=$2, time_course=$3, price=$4 \
    WHERE id_course=$1 \
    RETURNING id_course",

  CONFIRMCOURSE:
    "SELECT COUNT(cou.id_course) AS amount\
    FROM course cou \
    WHERE cou.type_course=$2 AND cou.id_course <> $1",
};
