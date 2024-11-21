const express = require('express');
const router = express.Router();
const PaisController = require('../controllers/pais-controller');
const authMiddleware = require('../middlewares/authMiddlewares');

// Rota para listar todos os países disponíveis
router.get('/paises', authMiddleware, PaisController.buscarPaises);

// Rota para listar países com base na sua economia (IDH/Moeda)
router.get('/paises/economia', authMiddleware,  PaisController.economiaPais);

// Rota para listar países com foco em turismo (Patrimônio Unesco/Região/Idioma)
router.get('/paises/turismo', authMiddleware,  PaisController.turismoPais);

// Rota para listar países com base na sua religião predominante
router.get('/paises/religiao', authMiddleware,  PaisController.religiaoPais);

// Rota para listar um país específico pelo id
router.get('/paises/:id', authMiddleware,  PaisController.buscarPais);

module.exports = router;
