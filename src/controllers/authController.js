import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";

export async function register(req, res) {
  const { nome, email, senha } = req.body;

  const senhaHash = await bcrypt.hash(senha, 10);

  const { error } = await supabase
    .from("usuarios")
    .insert({ nome, email, senha_hash: senhaHash });

  if (error) return res.status(400).json({ error });

  return res.json({ message: "Usuário registrado com sucesso" });
}

export async function login(req, res) {
  const { email, senha } = req.body;

  const { data: usuario, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single();

  if (!usuario || error) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

  if (!senhaValida) {
    return res.status(400).json({ error: "Senha inválida" });
  }

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.json({ token });
}
