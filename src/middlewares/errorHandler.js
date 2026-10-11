/**
 * Middleware para tratamento de rotas não encontradas (404).
 */
function notFoundHandler(req, res, next) {
  res.status(404).render('pages/404', {
    title: 'Página Não Encontrada | ' + (res.locals.serverName || 'Noxus'),
    path: req.originalUrl
  });
}

/**
 * Middleware para tratamento centralizado de erros internos (500).
 */
function serverErrorHandler(err, req, res, next) {
  console.error('[ERRO INTERNO]', err.stack || err.message);

  const statusCode = err.status || 500;
  res.status(statusCode).render('pages/500', {
    title: 'Erro no Servidor | ' + (res.locals.serverName || 'Noxus'),
    error: process.env.NODE_ENV === 'development' ? err.message : null
  });
}

module.exports = {
  notFoundHandler,
  serverErrorHandler
};
