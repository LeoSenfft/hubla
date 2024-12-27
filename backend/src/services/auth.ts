import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "my-secret-key";

export const generateToken = (
  payload: object,
  expiresIn = process.env.JWT_EXPIRES_IN || "200h"
) => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error("Token inválido!");
  }
};
