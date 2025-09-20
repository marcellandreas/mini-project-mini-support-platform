import express from "express";
import { supabase } from "../config/supabase.js";

const router = express.Router();

// Router Login
router.post("/login", async (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: "Name and role are required" });
  }

  // Cek role valid
  if (!["fan", "creator"].includes(role)) {
    return res.status(400).json({ error: "Role must be 'fan' or 'creator'" });
  }

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("name", name)
      .eq("role", role)
      .single(); // ambil 1 user

    if (error) {
      return res.status(404).json({ error: "User not found" });
    }

    // Jika login sukses, bisa return user + OTP simulasi
    const otp = "123456"; // bisa diganti dengan OTP random atau generate nyata
    console.log(`📱 OTP untuk ${name}: ${otp}`);

    res.json({
      message: "OTP dikirim ke console",
      otp,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Router Register
router.post("/register", async (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: "Name and role are required" });
  }

  // Cek role valid
  if (!["fan", "creator"].includes(role)) {
    return res.status(400).json({ error: "Role must be 'fan' or 'creator'" });
  }

  try {
    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("name", name)
      .eq("role", role)
      .maybeSingle();

    if (findError) {
      console.error(findError);
      return res.status(500).json({ error: "Database error" });
    }

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Insert user baru
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([{ name, role }])
      .select()
      .single();

    if (insertError) {
      console.error(insertError);
      return res.status(500).json({ error: "Failed to register user" });
    }

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Router All Users
router.get("/users", async (req, res) => {
  try {
    const { data: users, error } = await supabase.from("users").select("*");

    if (error) {
      return res.status(500).json({ error: "Failed to fetch users" });
    }

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
