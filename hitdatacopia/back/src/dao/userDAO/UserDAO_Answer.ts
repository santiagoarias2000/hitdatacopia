import jwt from 'jsonwebtoken';
import { Response } from "express";
class UserDAO_Answer {
    public static async process(data: any, res: Response): Promise<any> {
        if (data != null) {
            console.log(data);
            const tokenHitData = jwt.sign({ code: data.idUser, email: data.emailUser, profile: data.idProfile }, 'LaClaveVaAqui', { expiresIn: '8h' });
            return res.status(200).json({ tokenHitData: tokenHitData });
        } else {
            return res.status(401).json({ error: 'Usuario Incorrecto' });
        }
    }

}
export default UserDAO_Answer;