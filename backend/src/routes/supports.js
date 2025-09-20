import express from "express";
import { supabase } from "../config/supabase.js";

export default function supportRoutes(io) {
  const router = express.Router();

  // Fan kasih support ke creator
  router.post("/", async (req, res) => {
    const { fan_id, creator_id, amount } = req.body;

    if (fan_id === creator_id) {
      return res.status(400).json({ error: "You cannot support yourself" });
    }

    const { data, error } = await supabase
      .from("supports")
      .insert([{ fan_id, creator_id, amount, status: "pending" }])
      .select();

    if (error) return res.status(400).json({ error });

    setTimeout(async () => {
      await supabase
        .from("supports")
        .update({ status: "paid" })
        .eq("id", data[0].id);

      await supabase.rpc("increment_balance", {
        user_id_input: creator_id,
        amount_input: amount,
      });

      // Ambil nama fan untuk notifikasi
      const { data: fanData } = await supabase
        .from("users")
        .select("name")
        .eq("id", fan_id)
        .single();

      io.emit("support_success", {
        creator_id,
        amount,
        message: `You got Rp${amount} from ${fanData?.name || "Someone"}!`,
      });
    }, 3000);

    res.json({ message: "Support created, waiting for payment" });
  });

  // Router Get all Support By Fan_id
  router.get("/:fan_id", async (req, res) => {
    const { fan_id } = req.params;

    const { data, error } = await supabase
      .from("supports")
      .select(
        `
        id,
        amount,
        status,
        creator:creator_id (id, name) 
      `
      )
      .eq("fan_id", fan_id)
      .order("id", { ascending: false });

    if (error) return res.status(400).json({ error });

    res.json(data);
  });

  return router;
}
