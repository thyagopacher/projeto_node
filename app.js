const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

/** middleware de log */
const log = (req, res, next) => {
  console.log(`${req.method} ${req.url} .... Acesso em: ${new Date().toISOString()}`);
  next();
};

app.use(express.json());

/** declaração de rotas */

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/files', (req, res) => {
  const { titulo, genero } = req.body;
  // Lógica para criar um arquivo com o nome e conteúdo fornecidos
  res.status(201).json({ message: `Filme: ${titulo} - Genero: ${genero} criado com sucesso!` });
});

app.get('/transfere', log, (req, res) => {
  res.send('Transferência de dados');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
