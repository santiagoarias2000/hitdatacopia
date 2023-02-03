import { Response } from "express";
import jwt from 'jsonwebtoken';
class UserAccessAnswer {
    public static async process(register: any, res: Response): Promise<any> {

        if (register != null) {
            if (register != null) {
                console.log(register);
                ///vamos a crear el token
                const user=register.fullName;
                const role=register.idProfile;
                const dasdas = { codigo: register.idUser, correo: register.emailUser ,Estado: register.stateUser, role: register.idProfile, dosDev: 'eso somos' };
                console.log(dasdas)

                const tokenHitData = jwt.sign({ codigo: register.idUser, correo: register.emailUser ,Estado: register.stateUser, role: register.idProfile, dosDev: 'eso somos' }, 'LaClaveVaAqui', { expiresIn: '8h' });
                return res.status(200).json({ tokenHitData: tokenHitData,tokenName:user, tokenRole: role, tokenFull: dasdas});
            } else {
                return res.status(401).json({ miError: 'Usuario incorrecto' });
            }
        }

    }

}
export default UserAccessAnswer;