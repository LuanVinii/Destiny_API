const Favorito = require('../models/favorito');

class FavoritoController {

    // Adiciona um país à lista de favoritos do usuário
    static async addFavoritos(req, res) {
        try {
            const id = req.usuarioId;  // Obtém o ID do usuário autenticado a partir do token JWT
            const { id_pais, notas, prioridade } = req.body;  // Extrai as informações enviadas no corpo da requisição

            // Chama a função que adiciona o país à lista de favoritos do usuário no banco de dados
            const favorito = await Favorito.adicionarFav(id, id_pais, notas, prioridade);  

            // Se não conseguiu adicionar o favorito (por exemplo, se já existe ou algum outro erro), retorna uma mensagem de erro
            if (!favorito) {
                return res.status(400).json({ message: 'Não foi possível adicionar favorito' });
            }

            // Se tudo deu certo, retorna o favorito adicionado
            res.status(200).json(favorito);
        } catch (error) {
            console.error("Erro ao favoritar país:", error);
            // Caso ocorra algum erro inesperado, retorna um erro
            res.status(500).json({ message: 'Erro ao favoritar país' });
        }
    }

    // Lista todos os países que o usuário favoritou
    static async listarFavoritos(req, res) {
        try {
            const id = req.usuarioId;  // Obtém o ID do usuário autenticado a partir do token JWT

            // Chama a função que retorna todos os países favoritados pelo usuário no banco de dados
            const favoritos = await Favorito.listarFav(id);  

            // Se o usuário não tiver favoritos, retorna uma mensagem informando isso
            if (!favoritos || favoritos.length === 0) {
                return res.status(404).json({ message: 'Nenhum favorito encontrado para este usuário' });
            }

            // Se encontrou favoritos, retorna a lista de favoritos
            res.status(200).json(favoritos);
        } catch (error) {
            console.error("Erro ao listar países favoritados:", error);
            // Caso ocorra algum erro inesperado, retorna um erro
            res.status(500).json({ message: 'Erro ao listar países favoritados' });
        }
    }

    // Atualiza as informações de um país que já foi adicionado aos favoritos
    static async atualizarFavorito(req, res) {
        try {
            const idUsuario = req.usuarioId;  // Obtém o ID do usuário autenticado a partir do token JWT
            const id = req.params.id;  // Obtém o ID do favorito que será atualizado a partir dos parâmetros da URL
            const { id_pais, notas, prioridade } = req.body;  // Extrai as novas informações do corpo da requisição

            // Chama a função que atualiza as informações do favorito no banco de dados
            const favorito = await Favorito.atualizarFav(id, idUsuario, id_pais, notas, prioridade);  

            // Se o favorito não foi encontrado ou não foi possível atualizar, retorna uma mensagem de erro
            if (!favorito) {
                return res.status(404).json({ message: 'Favorito não encontrado para atualização' });
            }

            // Se tudo deu certo, retorna o favorito atualizado
            res.status(200).json(favorito);
        } catch (error) {
            console.error("Erro ao atualizar informações do favorito:", error);
            // Caso ocorra algum erro inesperado, retorna um erro
            res.status(500).json({ message: 'Erro ao atualizar informações do favorito' });
        }
    }

    // Remove um país da lista de favoritos do usuário
    static async removerFavoritos(req, res) {
        try {
            const idUsuario = req.usuarioId;  // Obtém o ID do usuário autenticado a partir do token JWT
            const id = req.params.id;  // Obtém o ID do favorito que será removido a partir dos parâmetros da URL

            // Chama a função que remove o país dos favoritos do usuário no banco de dados
            const favorito = await Favorito.removerFav(id, idUsuario);  

            // Se o favorito não foi encontrado ou não foi possível remover, retorna uma mensagem de erro
            if (!favorito) {
                return res.status(404).json({ message: 'Favorito não encontrado para exclusão' });
            }

            // Se a remoção foi bem-sucedida, retorna uma mensagem de sucesso com o favorito removido
            res.status(200).json({ message: 'Favorito removido com sucesso', favorito });
        } catch (error) {
            console.error("Erro ao remover país favoritado:", error);
            // Caso ocorra algum erro inesperado, retorna um erro
            res.status(500).json({ message: 'Erro ao remover país favoritado' });
        }
    }
}

module.exports = FavoritoController;
