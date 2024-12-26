import { Request } from "express";
import multer from "multer";

type FileNameCallback = (error: Error | null, filename: string) => void;

export default {
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: function (
      req: Request,
      file: Express.Multer.File,
      callback: FileNameCallback
    ) {
      callback(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 300 * 1024 * 1024, // 300 MB
  },
};
