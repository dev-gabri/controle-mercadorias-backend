import { supabase } from "../config/supabase.js";

export async function criarLancamento(req, res) {
  const {
    empresa_id,
    valor_mercadoria,
    com_nota,
    tipo_pagamento,
    observacao,
  } = req.body;

  const { error } = await supabase.from("lancamentos").insert({
    usuario_id: req.usuarioId,
    empresa_id,
    valor_mercadoria,
    com_nota,
    tipo_pagamento,
    observacao,
  });

  if (error) return res.status(400).json({ error });

  return res.json({ message: "Lançamento registrado" });
}

export async function listarLancamentos(req, res) {
  const { data, error } = await supabase
    .from("lancamentos")
    .select("*, empresas(*)")
    .eq("usuario_id", req.usuarioId);

  if (error) return res.status(400).json({ error });

  return res.json(data);
}
