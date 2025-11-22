import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import empresaRoutes from "./routes/empresaRoutes.js";
import lancamentoRoutes from "./routes/lancamentoRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/empresas", empresaRoutes);
app.use("/lancamentos", lancamentoRoutes);

app.get("/", (req, res) => {
  res.send("API Funcionando 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
