import express from "express";
import { supabase } from "../config/supabase.js";

const router = express.Router();

// Router GET by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("balances")
    .select("*")
    .eq("user_id", id);

  if (error) return res.status(400).json({ error });

  // Jika tidak ada data, kembalikan default
  if (!data || data.length === 0) {
    return res.json({ user_id: id, amount: 0 });
  }

  res.json(data[0]);
});

export default router;
