const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const routes = require('./routes/index');
const { notFoundHandler, serverErrorHandler } = require('./middlewares/errorHandler');

const app = express();

// ==========================================
// Middlewares de Segurança e Otimização
// ==========================================
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        scriptSrc: ["'self'", "'unsafe-inline'"]
      }
    }
  })
);

app.use(compression());
app.use(morgan('dev'));

// Parse de corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Arquivos Estáticos e View Engine (EJS)
// ==========================================
app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware global para variáveis compartilhadas nas views
app.use((req, res, next) => {
  res.locals.serverName = process.env.SERVER_NAME || 'Noxus';
  res.locals.currentPath = req.path;
  next();
});

// ==========================================
// Rotas da Aplicação
// ==========================================
app.use('/', routes);

// ==========================================
// Tratamento de Erros
// ==========================================
app.use(notFoundHandler);
app.use(serverErrorHandler);

module.exports = app;
