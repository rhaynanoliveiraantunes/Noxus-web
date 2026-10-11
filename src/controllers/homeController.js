/**
 * Controlador para a página inicial (Home).
 */
const homeController = {
  /**
   * Renderiza a página inicial da comunidade.
   */
  getHome: (req, res) => {
    res.render('pages/home', {
      title: `${res.locals.serverName} - Portal da Comunidade`
    });
  }
};

module.exports = homeController;
