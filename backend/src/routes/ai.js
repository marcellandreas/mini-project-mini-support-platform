import express from "express";

const router = express.Router();

router.get("/caption", (req, res) => {
  res.json({ caption: "Thank you for supporting my art 💖" });
});

export default router;
