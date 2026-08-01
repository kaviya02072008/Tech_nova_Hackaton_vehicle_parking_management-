// backend/server.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

/* ---------------- Middleware ---------------- */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- Health Check ---------------- */

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");

    res.status(200).json({
      success: true,
      message: "Smart Mall Parking API is running",
      database: "Connected",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Database Connection Failed",
      error: err.message,
    });
  }
});

/* ---------------- Routes ---------------- */

app.use("/api/auth", authRoutes);

// Future routes
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/slots", slotRoutes);
// app.use("/api/admin", adminRoutes);

/* ---------------- Error Handling ---------------- */

app.use(notFound);
app.use(errorHandler);

/* ---------------- Socket.IO ---------------- */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🔵 Socket Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Socket Disconnected:", socket.id);
  });
});

app.set("io", io);

/* ---------------- Start Server ---------------- */

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  console.log(`🚀 Smart Mall Parking API running on port ${PORT}`);

  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL Connected Successfully");
    console.log("🕒 Database Time:", result.rows[0].now);
  } catch (err) {
    console.error("❌ PostgreSQL Connection Failed");
    console.error(err.message);
  }
});

module.exports = { app, server, io };