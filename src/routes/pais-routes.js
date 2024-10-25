const express = require('express');
const router = express.Router();
const { buscarPaises, buscarPais } = require('../controllers/pais-controller');

// Rota para listar todos os países disponíveis
router.get('/paises', buscarPaises);

// Rota para listar um país específico pelo id
router.get('/paises/:id', buscarPais);

// Rota para listar países com base na sua economia. IDH/Moeda
/*router.get('/paises/economia', economiaPais);

// Rota para listar países com foco em turismo. PatrimonioUnesco/Região/Idioma
router.get('/paises/turismo', turismoPais);

// Rota para listar países com base na sua religião predominante
router.get('/paises/religiao', religiaoPais);*/

module.exports = router;
