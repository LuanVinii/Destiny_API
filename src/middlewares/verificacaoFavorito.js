const client = require('../config/db');

class VerificacaoFavorito {

    // Método que verifica se o favorito já foi adicionado anteriormente pelo usuário
    static async verificarFavoritoExistente(req, res, next) {
        const { id_pais } = req.body;  // Obtém o id do país que está sendo favoritado
        const id_usuario = req.usuarioId;  // Obtém o id do usuário autenticado (do token)

        // Verifica se o id do usuário e o id do país foram fornecidos na requisição
        if (!id_usuario || !id_pais) {
            return res.status(400).json({ error: 'Usuário e País são necessários' });
        }

        // Tenta consultar no banco de dados para verificar se esse país já está favoritado pelo usuário
        try {
            const resultado = await client.query(
                'SELECT * FROM favorito WHERE id_usuario = $1 AND id_pais = $2',  // Query SQL que busca por esse favorito no banco
                [id_usuario, id_pais]  // Passa o id do usuário e o id do país para a consulta
            );

            // Se o país já estiver na lista de favoritos do usuário, retorna um erro
            if (resultado.rows.length > 0) {
                return res.status(400).json({ error: 'Este país já está favoritado por este usuário' });
            }

            // Se não encontrou nenhum favorito, passa para o próximo middleware ou controlador
            next();
        } catch (error) {
            // Se ocorrer algum erro durante a consulta no banco, retorna um erro
            return res.status(500).json({ error: 'Erro ao verificar favorito' });
        }
    }

    // Método que valida as informações enviadas na requisição para adicionar ou atualizar um favorito
    static async validarFavorito(req, res, next) {
        const { id_pais, prioridade, notas } = req.body;  // Obtém as informações de id_pais, prioridade e notas da requisição

        // Verifica se o id_pais foi fornecido e se é um número válido
        if (!id_pais || isNaN(id_pais)) {
            return res.status(400).json({ error: 'id_pais deve ser um número válido' });
        }
        
        // Verifica se a prioridade foi fornecida e se é um número
        if (isNaN(prioridade)) {
            return res.status(400).json({ error: 'Prioridade deve ser um número' });
        }

        // Verifica se a prioridade está dentro do intervalo de 1 a 3
        if (prioridade < 1 || prioridade > 3) {
            return res.status(400).json({ error: 'Prioridade deve ser um número entre 1 e 3' });
        }

        // Verifica se as notas, se fornecidas, são uma string
        if (notas && typeof notas !== 'string') {
            return res.status(400).json({ error: 'Notas deve ser uma string' });
        }

        next();
    }
}

module.exports = VerificacaoFavorito;
