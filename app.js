const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const connectedUsers = new Set();
const waitingUsers = [];

const validarSiElUsuarioYaEstaConectado = (username) => {
  return connectedUsers.has(username);
}

io.on('connection', (socket) => {
  const username = socket.handshake.query.username;
  
  if (!username || validarSiElUsuarioYaEstaConectado(username)) {
    socket.emit("connectionRejected");
    socket.disconnect();
    return;
  }

  console.log(username + ' connected');
  connectedUsers.add(username);

  socket.on('disconnect', () => {
    console.log(username + ' disconnected');
    connectedUsers.delete(username);
    const index = waitingUsers.indexOf(socket);
    if (index !== -1) {
      waitingUsers.splice(index, 1);
    }
  });

  socket.on('searchMatch', () => {
    waitingUsers.push(socket);

    if (waitingUsers.length >= 2) {
      
      const user1 = waitingUsers.shift();
      const user2 = waitingUsers.shift();

      user1.emit("matchReady", { opponent: username });
      user2.emit("matchReady", { opponent: user1.handshake.query.username });
    }
  });

  socket.on('stopSearchMatch', () => {
    const index = waitingUsers.indexOf(socket);
    if (index !== -1) {
      waitingUsers.splice(index, 1);
    }
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
}); 