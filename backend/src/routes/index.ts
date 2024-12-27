import express, { Request, Response } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import { createSales, readFile } from "../services/sales-service";
import { authenticate } from "../middleware/auth";
import { client } from "../server";

export const router = express.Router();

router.get(
  "/",
  authenticate,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const data = await client.sale.findMany({
        include: {
          type: true,
          product: { include: { vendor: true } },
          user: true,
        },
      });

      return res.status(200).json({
        status: 200,
        data: data,
        message: "Transações obtidas com sucesso!",
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

router.post(
  "/",
  authenticate,
  multer(multerConfig).single("file"),
  async (req: Request, res: Response): Promise<any> => {
    try {
      const file_data = await readFile(req.file);

      const data = await createSales(file_data);

      return res.status(201).json({
        status: 201,
        data,
        message: "Arquivos enviado!",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Ocorreu um error ao tentar enviar os dados ao servidor!",
      });
    }
  }
);
