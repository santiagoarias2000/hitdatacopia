export const SQL_COURSE_DETAILS ={
    DETAILS: 'SELECT id_course, type_course,time_course,price  \
    FROM course \
    WHERE id_course = $1',

    DETAILSUPPDATE:"SELECT id_course, type_course,time_course,price\
    FROM course \
    WHERE id_course = $1"
}