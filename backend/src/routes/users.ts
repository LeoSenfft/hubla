import { Router, Request, Response } from "express";
import { authenticate } from "../middleware/auth";
import { client } from "../server";

const router = Router();

router.get(
  "/",
  authenticate,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const data = await client.user.findMany();

      return res.status(200).json({
        status: 200,
        data: data,
        message: "Usuários obtidos com sucesso!",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: 500,
        message: "Ocorreu um error ao tentar buscar os dados do servidor!",
      });
    }
  }
);

export default router;
