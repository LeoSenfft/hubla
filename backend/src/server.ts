import express from "express";
import { Client } from "pg";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
router;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Conectado ao PostgreSQL"))
  .catch((err) => console.error("Erro ao conectar ao PostgreSQL", err));

app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
