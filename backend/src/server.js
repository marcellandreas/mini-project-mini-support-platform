import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

// Import routes
import authRoutes from "./routes/auth.js";
import creatorRoutes from "./routes/creators.js";
import balanceRoutes from "./routes/balance.js";
import supportRoutes from "./routes/supports.js";
import aiRoutes from "./routes/ai.js";
import postsRouter from "./routes/posts.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Routes
app.use("/auth", authRoutes);
app.use("/creators", creatorRoutes);
app.use("/balance", balanceRoutes);
app.use("/supports", supportRoutes(io));
app.use("/ai", aiRoutes);
app.use("/posts", postsRouter);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
