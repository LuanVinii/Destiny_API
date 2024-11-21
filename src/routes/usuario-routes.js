const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario-controller');
const authMiddleware = require('../middlewares/authMiddlewares');
const VerificacaoUsuario = require('../middlewares/verificacaoUsuario');

// Rota para criar um novo usuário com validação de cadastro
router.post('/usuario/create', VerificacaoUsuario.validarCadastro, UsuarioController.criarUsuario);

// Rota para autenticação do usuário com validação de autenticação
router.post('/usuario/autenticar', VerificacaoUsuario.validarAutenticacao, UsuarioController.autenticarUsuario);

// Rota para buscar um usuário por id específico com autenticação
router.get('/usuario/buscar', authMiddleware, UsuarioController.buscarUsuario);

// Rota para atualizar dados do usuário utilizando seu id com validação de atualização
router.put('/usuario/atualizar', authMiddleware, VerificacaoUsuario.validarAtualizacao, UsuarioController.atualizarUsuario);

module.exports = router;
