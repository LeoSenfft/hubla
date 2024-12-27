import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { router } from "./routes";
import cors from "cors";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

export const client = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

client
  .$connect()
  .then(() => console.log("Conectado ao PostgreSQL"))
  .catch((err) => console.error("Erro ao conectar ao PostgreSQL", err));

app.use(cors());
app.use(express.json());

app.use("/", router);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
