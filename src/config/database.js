const mongoose = require('mongoose');

/**
 * Conecta a aplicação ao banco de dados MongoDB utilizando Mongoose.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('[AVISO] MONGODB_URI não foi definida nas variáveis de ambiente (.env).');
    return;
  }

  try {
    // Configura listeners para monitoramento contínuo da conexão
    mongoose.connection.on('connected', () => {
      console.log('[BANCO DE DADOS] Conectado com sucesso ao MongoDB.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('[BANCO DE DADOS] Erro na conexão com o MongoDB:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[BANCO DE DADOS] Conexão com o MongoDB perdida.');
    });

    await mongoose.connect(uri);
  } catch (error) {
    console.error('[BANCO DE DADOS] Falha ao tentar conectar ao MongoDB:', error.message);
    console.info('[BANCO DE DADOS] O servidor continuará em execução para servir as páginas web.');
  }
}

module.exports = connectDB;
