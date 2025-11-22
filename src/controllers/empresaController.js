import { supabase } from "../config/supabase.js";

export async function criarEmpresa(req, res) {
  const { nome, cnpj } = req.body;

  const { error } = await supabase.from("empresas").insert({ nome, cnpj });

  if (error) return res.status(400).json({ error });

  return res.json({ message: "Empresa cadastrada" });
}

export async function listarEmpresas(req, res) {
  const { data, error } = await supabase.from("empresas").select("*");

  if (error) return res.status(400).json({ error });

  return res.json(data);
}
