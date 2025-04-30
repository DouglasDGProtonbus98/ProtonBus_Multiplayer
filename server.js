
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let players = {};
app.post('/api/pos', (req, res) => {
  const { nick, pos, rotation } = req.body;
  players[nick] = { pos, rotation, lastUpdate: Date.now() };
  res.sendStatus(200);
});

io.on('connection', (socket) => {
  console.log('Player connected');
});

setInterval(() => {
  io.emit('update_positions', players);
}, 100);

http.listen(3000, () => {
  console.log('Servidor escutando na porta 3000');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${3000}`);
});

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Servidor do Proton Bus Multiplayer PRO ativo!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${3000}`);
});
