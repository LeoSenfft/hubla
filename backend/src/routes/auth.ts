import { generateToken, verifyToken } from "../services/auth";
import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { client } from "../server";

const router = Router();

function loginError(res: Response) {
  return res.status(401).json({
    status: 401,
    message: "Usuário ou senha incorretos",
  });
}

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { name, password } = req.body;

  if (!name || !password) {
    return loginError(res);
  }

  try {
    const user = await client.user.findUnique({
      where: {
        name: name,
      },
      omit: {
        password: false,
      },
    });
    if (!user) {
      return loginError(res);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return loginError(res);
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
    });

    return res.json({ user: { ...user, password: undefined }, token });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Erro interno do servidor",
    });
  }
});

router.get("/me", async (req: Request, res: Response): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não encontrado" });
  }

  try {
    const decoded: any = verifyToken(token);

    const user = await client.user.findUnique({
      where: { id: decoded.id },
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
});

export default router;
