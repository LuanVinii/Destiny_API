const express = require('express');
const router = express.Router();
const {criarUsuario, buscarUsuario, atualizarUsuario, removerUsuario} = require('../controllers/usuario-controller');

// Rota para criar um novo usuário
router.post('/usuarios', criarUsuario);

// Rota para buscar um usuário por id específico
router.get('/usuarios/:id', buscarUsuario);

// Rota para atualizar dados do usuário utilizando seu id
router.put('/usuarios/:id', atualizarUsuario);

// Rota para remover um usuário utilizando seu id
router.delete('/usuarios/:id', removerUsuario);

module.exports = router;
