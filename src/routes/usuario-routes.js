const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario-controller');
const authMiddleware = require('../middlewares/authMiddlewares')

// Rota para criar um novo usuário
router.post('/usuario/create', UsuarioController.criarUsuario);

// Rota para autenticação do usuário
router.post('/usuario/autenticar', UsuarioController.autenticarUsuario)

// Rota para buscar um usuário por id específico
router.get('/usuario/buscar', authMiddleware, UsuarioController.buscarUsuario);

// Rota para atualizar dados do usuário utilizando seu id
router.put('/usuario/atualizar', authMiddleware, UsuarioController.atualizarUsuario);

module.exports = router;
