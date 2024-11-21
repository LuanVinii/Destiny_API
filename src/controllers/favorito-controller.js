const Favorito = require('../models/favorito');

class FavoritoController{

    static async addFavoritos(req, res){
        try{
            const id = req.usuarioId;
            const {id_pais, notas, prioridade} = req.body
            const favorito = await Favorito.adicionarFav(id, id_pais, notas, prioridade);
            if(!favorito){
                return res.status(400).json({message: 'Não foi possível adicionar favorito'})
            }
            res.status(200).json(favorito);
        }
        catch(error){
            console.error("Erro ao favoritar país:", error);
            res.status(500).json({message: 'Erro ao favoritar país'});
        }
    }

    static async listarFavoritos(req, res){
        try{
            const id = req.usuarioId;
            const favoritos = await Favorito.listarFav(id);
            if(!favoritos || favoritos.length === 0){
               return  res.status(404).json({message: 'Nnehum favorito encontrado para este usuário'})
            }
            res.status(200).json(favoritos);
        } catch(error){
            console.error("Erro ao listar países favoritados:", error);
            res.status(500).json({message: 'Erro ao listar países favoritados'});
        }
    }

    static async atualizarFavorito(req, res) {
        try {
            const idUsuario = req.usuarioId;
            const id = req.params.id;
            const { id_pais, notas, prioridade } = req.body;
            const favorito = await Favorito.atualizarFav(id, idUsuario, id_pais, notas, prioridade);
            if(!favorito){
                return res.status(404).json({message: 'Favorito não encontrado para atualização'})
            }
            res.status(200).json(favorito);
        } catch (error) {
            console.error("Erro ao atualizar Informações:", error);
            res.status(500).json({ message: 'Erro ao atualizar Informações' });
        }
    }    

    static async removerFavoritos(req, res){
        try{
            const idUsuario = req.usuarioId;
            const id = req.params.id;
            const favorito = await Favorito.removerFav(id, idUsuario);
            if(!favorito){
                return res.status(404).json({message: 'Favorito não encontrado para exclusão'})
            }
            res.status(200).json({message: 'Favorito removido com sucesso', favorito});
        } catch(error){
            console.error("Erro ao remover país favoritado:", error);
            res.status(500).json({message: 'Erro ao remover país favoritado'});
        }
    }
}

module.exports = FavoritoController