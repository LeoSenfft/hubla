import express from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import { readFile } from "../services/sales-service";

export const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
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
