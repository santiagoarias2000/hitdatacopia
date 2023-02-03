import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class Safety {

  public verificarToken(req: Request, res: Response, next: NextFunction): any {
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
      res.status(401).json({
        respuesta: "Petición negada por el sistema de seguridad",
      });
    } else {
      try {
        const llavePrivada = String(process.env.PASSWORD_ULTRA_SECRET);
        const tokenHitData = req.headers.authorization?.split(" ")[1] as string;
        const datos = jwt.verify(tokenHitData, 'LaClaveVaAqui');
        req.body.datosUsuario = datos;
        next();
      } catch (error) {
        res.status(401).json({ respuesta: "Intento de fraude" });
      }
    }
  }

}
const safety = new Safety();
export default safety;