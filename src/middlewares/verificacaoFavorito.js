const client = require('../config/db')

class VerificacaoFavorito {

    // Método que verifica se o favorito já existe
    static async verificarFavoritoExistente(req, res, next) {
        const { id_pais } = req.body;
        const id_usuario = req.usuarioId;

        // Verifica se o usuário e o país estão presentes
        if (!id_usuario || !id_pais) {
            return res.status(400).json({ error: 'Usuário e País são necessários' });
        }

        // Consulta no banco de dados para verificar a existência do favorito
        try {
            const resultado = await client.query(
                'SELECT * FROM favorito WHERE id_usuario = $1 AND id_pais = $2',
                [id_usuario, id_pais]
            );

            // Se o favorito já existir, retorna um erro
            if (resultado.rows.length > 0) {
                return res.status(400).json({ error: 'Este país já está favoritado por este usuário' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao verificar favorito' });
        }
    }

    // Método que valida as informações do favorito
    static async validarFavorito(req, res, next) {
        const { id_pais, prioridade, notas } = req.body;

        // Verifica se id_pais é um número válido
        if (!id_pais || isNaN(id_pais)) {
            return res.status(400).json({ error: 'id_pais deve ser um número válido' });
         }
        
        // Verifica se prioridade é um número e está entre 1 e 3
        if (isNaN(prioridade)) {
            return res.status(400).json({ error: 'Prioridade deve ser um número' });
        }

        if (prioridade < 1 || prioridade > 3) {
            return res.status(400).json({ error: 'Prioridade deve ser um número entre 1 e 3' });
        }

        // Verifica se notas é uma string
        if (notas && typeof notas !== 'string') {
            return res.status(400).json({ error: 'Notas deve ser uma string' });
        }

        next();
    }
}

module.exports = VerificacaoFavorito;
