import express from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import { readFile } from "../services/sales-service";
import { PrismaClient } from "@prisma/client";

export const router = express.Router();
const client = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const data = await client.sale.findMany({ include: { type: true } });

    res.status(200).json({
      status: 200,
      data: data,
      message: "Dados obtidos com sucesso!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: 500,
      message: "Ocorreu um error ao tentar buscar os dados do servidor!",
    });
  }
});

router.post("/", multer(multerConfig).single("file"), async (req, res) => {
  try {
    const data = await readFile(req.file);

    res.status(201).json({
      status: 201,
      data,
      message: "Dados obtidos com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Ocorreu um error ao tentar enviar os dados ao servidor!",
    });
  }
});
