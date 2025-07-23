// src/socket.js
import { io } from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_API_BASE;
const socket = io(ENDPOINT, {
  withCredentials: true, // optional, based on your CORS setup
});

export default socket;
