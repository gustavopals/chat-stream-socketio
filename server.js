const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Configuração do servidor
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servindo arquivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Quando um cliente se conecta
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  // Recebendo mensagem do cliente
  socket.on('chat message', (msg) => {
    console.log('Mensagem recebida: ' + msg);

    // Enviando a mensagem para todos os clientes
    io.emit('chat message', msg);
  });

  // Quando o cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
