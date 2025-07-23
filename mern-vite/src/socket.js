// src/socket.js
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000"; // Your backend server
const socket = io(ENDPOINT);

export default socket;
