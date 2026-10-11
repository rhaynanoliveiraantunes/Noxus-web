require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3000;
const SERVER_NAME = process.env.SERVER_NAME || 'Noxus';

// Inicializa a conexão com o MongoDB
connectDB();

// Inicia o servidor HTTP
app.listen(PORT, () => {
  console.log(`[SERVIDOR] Portal ${SERVER_NAME} ativo e operando em http://localhost:${PORT}`);
  console.log(`[AMBIENTE] Modo: ${process.env.NODE_ENV || 'development'}`);
});