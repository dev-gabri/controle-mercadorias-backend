import express from "express";
import { criarLancamento, listarLancamentos } from "../controllers/lancamentoController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, criarLancamento);
router.get("/", authMiddleware, listarLancamentos);

export default router;
