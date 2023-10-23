const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const cors = require('cors');
const app = require('express')();
app.use(cors());
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:4200", // ваш домен клієнта
    methods: ["GET", "POST"]
  }
});
let todos = [];

io.on('connection', (socket) => {
  socket.on('updateTodos', (todos) => {
    socket.broadcast.emit('updateTodos', todos);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
