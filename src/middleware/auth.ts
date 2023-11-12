import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import cryptoCookie from "../utils/cryptoCookie";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  /*  
    #swagger.autoHeaders=false
    #swagger.security = [{
      "api_key": []
    }]
  */

  const token = req.headers.authorization && cryptoCookie.decryptCookie(req.headers.authorization);
  // const token = req.cookies.Authorization && cryptoCookie.decryptCookie(req.cookies.Authorization);

  if (!token) {
    return res.status(401).send("Token bulunamadı");
  }

  try {
    jwt.verify(token, process.env.TOKEN_KEY);
    next();
  } catch (err) {
    return res.status(401).send("Geçersiz token");
  }
};
