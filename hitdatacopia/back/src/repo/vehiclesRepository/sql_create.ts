export const SQL_VEHICLE_CREATE={
    CREATE: 'INSERT INTO vehicle(type_vehicle, license_plate, expiration_soat, expiration_tecnomechanic ) values($1, $2, $3,$4) \
    RETURNING id_vehicle',

    CONFIRMARVEHICLE:
    "SELECT COUNT(veh.id_vehicle) AS amount\
    FROM vehicle veh \
    WHERE lower(veh.license_plate)=lower($2)"
}