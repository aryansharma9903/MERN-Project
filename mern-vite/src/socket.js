// src/socket.js
import { io } from "socket.io-client";

const ENDPOINT = "https://mern-project-ksi2.onrender.com"; // Your backend server
const socket = io(ENDPOINT);

export default socket;
