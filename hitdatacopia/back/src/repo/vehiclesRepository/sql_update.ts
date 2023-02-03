export const SQL_VEHICLES_UPDATE ={
    CONFIRMARVEHICLE:
    "SELECT COUNT(veh.id_vehicle) AS amount\
    FROM vehicle veh \
    WHERE lower(veh.license_plate)=lower($3) AND veh.id_vehicle <> $1",

    UPDATE: 'UPDATE vehicle SET  type_vehicle=$2, license_plate=$3, expiration_soat =$4,expiration_tecnomechanic=$5 \
    WHERE id_vehicle=$1 \
    RETURNING id_vehicle'
}
