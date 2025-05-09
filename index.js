const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyParser.json());

const users = [];

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const userExists = users.find(user => user.username === username);

  if (userExists) {
    return res.json({ success: false, message: 'Usuário já existe.' });
  }

  users.push({ username, password });
  res.json({ success: true });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.json({ success: false, message: 'Usuário ou senha inválidos.' });
  }

  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
