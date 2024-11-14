const express = require('express');
const router = express.Router();
const FavoritoController = require('../controllers/favorito-controller');
const authMiddleware = require('../middlewares/authMiddlewares');

// Rota para adicionar um país aos favoritos
router.post('/favoritos', authMiddleware, FavoritoController.addFavoritos);

// Rota para listar favoritos de um usuário
router.get('/favoritos', authMiddleware, FavoritoController.listarFavoritos);

// Rota para atualizar as informações de um país favoritado pelo usuário
router.put('/favoritos/:id', authMiddleware, FavoritoController.atualizarFavorito)

// Rota para excluir um país dos favoritos do usuário
router.delete('/favoritos/:id', authMiddleware, FavoritoController.removerFavoritos);

module.exports = router;