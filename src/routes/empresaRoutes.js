import express from "express";
import {
  criarEmpresa,
  listarEmpresas,
} from "../controllers/empresaController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, criarEmpresa);
router.get("/", authMiddleware, listarEmpresas);

export default router;
