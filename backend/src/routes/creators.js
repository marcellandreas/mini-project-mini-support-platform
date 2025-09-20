import express from "express";
import { supabase } from "../config/supabase.js";

const router = express.Router();

// Router All creator
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, role")
    .eq("role", "creator");

  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Get Posting by Id
router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("creator_id", id);

  if (error) return res.status(400).json({ error });
  res.json(data);
});

export default router;
