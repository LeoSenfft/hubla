import { NextFunction } from "express";
import { verifyToken } from "../services/auth";

export const authenticate = (req: any, res: any, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Usuário não autorizado!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido!" });
  }
};
