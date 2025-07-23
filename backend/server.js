import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import cors from 'cors';

const app = express();
dotenv.config();
connectDB();

const allowedOrigins = [
  'http://localhost:5173', // for local dev
  'https://mern-chat-app-six-smoky.vercel.app' // replace with your actual frontend URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.get('/', (req,res) => {
    res.send('hello');
})

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound)
app.use(errorHandler)

const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("⚡ New client connected");

  // When user opens chat app
  socket.on("setup", (userData) => {
    socket.join(userData._id); // Join user-specific room
    socket.emit("connected");
  });

  // When user enters a specific chat
  socket.on("join chat", (room) => {
    socket.join(room); // Join chat room
    console.log("User joined room:", room);
  });

  // When user sends a new message
  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.yellow.bold);
});
