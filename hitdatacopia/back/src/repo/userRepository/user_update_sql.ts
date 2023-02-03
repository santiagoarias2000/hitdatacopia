export const SQL_USER_UPDATE = {
    UPDATE: 'UPDATE users SET full_name = $2 ,email_user = $3, state_user = $4 , id_profile = $5,password_user = $6,date_user = $7\
    WHERE id_user = $1 RETURNING id_user ',


    UPDATE_CONFIRM: 'SELECT COUNT(id_user) AS amount FROM users \
    WHERE lower(email_user) = lower($3) AND id_user <> $1'
}