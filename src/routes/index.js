const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Rota inicial da comunidade
router.get('/', homeController.getHome);

module.exports = router;
