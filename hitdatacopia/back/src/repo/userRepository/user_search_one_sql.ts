export const SQL_USER_SEARCH_ONE = {
    LOGIN:'select id_user,full_name,email_user,state_user, profile.id_profile, profile.name_profile \
    from users \
    inner join profile on users.id_profile = profile.id_profile \
    where email_user = $1 \
    AND password_user = $2',

    FIND_ONE:'SELECT id_user,full_name,email_user,state_user,password_user, id_profile,date_user FROM users WHERE id_user = $1'
}