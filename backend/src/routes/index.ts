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

    res.json({
      status: 200,
      data: data,
      message: "Sucesso!",
    });
  } catch (error) {
    console.error(error);

    res.json({
      status: 500,
      message: error,
    });
  }
});

router.post("/", multer(multerConfig).single("file"), (req, res) => {
  try {
    const message = readFile(req.file);

    res.json({
      status: 201,
      message,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: error,
    });
  }
});
