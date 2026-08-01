// backend/server.js
// Application entry point. Sets up Express, middleware, routes,
// error handling, and (for future modules) Socket.IO.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// ---- Core middleware ----
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

// ---- Health check ----
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Smart Mall Parking API is running' });
});

// ---- Module routes ----
app.use('/api/auth', authRoutes);
// Future modules will mount here, e.g.:
// app.use('/api/vehicles', vehicleRoutes);
// app.use('/api/floors', floorRoutes);
// app.use('/api/slots', slotRoutes);
// app.use('/api/bookings', bookingRoutes);

// ---- Error handling (must be last) ----
app.use(notFound);
app.use(errorHandler);

// ---- HTTP + Socket.IO server ----
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Make io available to controllers/services in later modules
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Smart Mall Parking API listening on port ${PORT}`);
});

module.exports = { app, server, io };
