// testSupabase.js
import fetch from "node-fetch";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log("URL:", supabaseUrl);
console.log("Key length:", supabaseKey?.length);

const supabase = createClient(supabaseUrl, supabaseKey, {
  global: { fetch }, // pakai node-fetch, bukan undici bawaan
});

const test = async () => {
  const { data, error } = await supabase.from("users").select("*");
  console.log("data:", data);
  console.log("error:", error);
};

test();
