import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { router } from "./routes";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

const client = new PrismaClient();

client
  .$connect()
  .then(() => console.log("Conectado ao PostgreSQL"))
  .catch((err) => console.error("Erro ao conectar ao PostgreSQL", err));

app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
