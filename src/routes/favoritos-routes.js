const express = require('express');
const router = express.Router();
const {AddFavoritos, listarFavoritos,atualizarFavorito, removerFavoritos} = require('../controllers/favoritos-controller')

// Rota para adicionar um país aos favoritos
router.post('/favoritos', AddFavoritos);

// Rota para listar favoritos de um usuário
router.get('/favoritos', listarFavoritos);

// Rota para atualizar as informações de um país favoritado pelo usuário
router.put('/favoritos/:id', atualizarFavorito)

// Rota para excluir um país dos favoritos do usuário
router.delete('/favoritos/:id', removerFavoritos);

module.exports = router;