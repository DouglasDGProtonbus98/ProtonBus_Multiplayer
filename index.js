
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json());

const users = [];

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.json({ success: false, message: 'Usuário já existe.' });
  }
  users.push({ username, password });
  res.json({ success: true });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const found = users.find(u => u.username === username && u.password === password);
  if (!found) return res.json({ success: false, message: 'Credenciais inválidas.' });
  res.json({ success: true });
});

io.on('connection', (socket) => {
  console.log(`🔌 Jogador conectado: ${socket.id}`);

  socket.on('playerData', (data) => {
    socket.broadcast.emit('updatePlayers', {
      id: socket.id,
      ...data
    });
  });

  socket.on('disconnect', () => {
    console.log(`❌ Jogador desconectado: ${socket.id}`);
    socket.broadcast.emit('removePlayer', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
