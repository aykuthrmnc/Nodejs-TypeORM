import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
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
