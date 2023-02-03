export const SQL_ACCESS_LOGIN={
VALIDATELOGIN:"select users.name_user, users.lastname_user,roles.name_rol \
from users \
inner join access \
ON access.id_user = users.id_user \
RIGHT JOIN roles \
ON roles.id_rol = users.id_rol \
where  mail_access = $1 AND password_access = $2"
}