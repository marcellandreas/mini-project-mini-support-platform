import express from "express";
import { supabase } from "../config/supabase.js";

const router = express.Router();

// Router All Posts
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Router posts creator_id
router.get("/creator/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("creator_id", id);

  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Router Post
router.post("/", async (req, res) => {
  const { creator_id, text, media_url } = req.body;

  if (!creator_id || !text) {
    return res.status(400).json({ error: "creator_id dan text wajib diisi" });
  }

  const newPost = {
    creator_id,
    text,
  };

  // hanya tambahkan media_url kalau ada
  if (media_url) {
    newPost.media_url = media_url;
  }

  const { data, error } = await supabase
    .from("posts")
    .insert([newPost])
    .select();

  if (error) return res.status(400).json({ error });
  res.status(201).json(data[0]);
});

export default router;
