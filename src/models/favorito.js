const client = require('../config/db');

class Favorito {
    
    // Construtor da classe para definir as propriedades do objeto Favorito
    constructor(id, id_usuario, id_pais, data_adicionado, notas, prioridade) {
        this.id = id;                 // ID do favorito
        this.id_usuario = id_usuario; // ID do usuário que favoritou o país
        this.id_pais = id_pais;       // ID do país que está sendo favoritado
        this.data_adicionado = data_adicionado; // Data em que o país foi adicionado como favorito
        this.notas = notas;           // Notas ou comentários sobre o país favorito
        this.prioridade = prioridade; // Prioridade do favorito (ex: 1, 2, ou 3)
    }

    // Método para adicionar um novo favorito na tabela 'favorito'
    static async adicionarFav(id_usuario, id_pais, notas, prioridade) {
        // Consulta SQL para inserir um novo favorito
        const add = `INSERT INTO favorito (id_usuario, id_pais, notas, prioridade)
                        VALUES ($1, $2, $3, $4) RETURNING *`;
        // Array com os valores a serem inseridos na tabela para evitar injeção SQL
        const valores = [id_usuario, id_pais, notas, prioridade];
        
        // Execução da query no banco de dados
        const resultado = await client.query(add, valores);
        
        // Retorna o primeiro item da resposta (o favorito recém-adicionado)
        return resultado.rows[0];
    }

    // Método para listar todos os favoritos de um usuário
    static async listarFav(id_usuario) {
        // Consulta SQL para selecionar todos os favoritos de um usuário específico
        const consultar = `SELECT * FROM favorito WHERE id_usuario = $1`;
        
        // Execução da query no banco de dados
        const resultado = await client.query(consultar, [id_usuario]);
        
        // Retorna todos os favoritos encontrados para o usuário
        return resultado.rows;
    }

    // Método para atualizar um favorito específico
    static async atualizarFav(id, id_usuario, id_pais, notas, prioridade) {
        // Consulta SQL para atualizar um favorito específico
        const att = `UPDATE favorito 
                     SET id_pais = $1, notas = $2, prioridade = $3 
                     WHERE id = $4 AND id_usuario = $5 RETURNING *`;
        
        // Array com os valores a serem atualizados na tabela para evitar injeção SQL
        const valores = [id_pais, notas, prioridade, id, id_usuario];
        
        // Execução da query no banco de dados
        const resultado = await client.query(att, valores);
        
        // Retorna o favorito atualizado
        return resultado.rows[0];
    }

    // Método para remover um favorito específico
    static async removerFav(id, id_usuario) {
        // Consulta SQL para deletar um favorito específico
        const del = `DELETE FROM favorito WHERE id = $1 AND id_usuario = $2 RETURNING *`;
        
        // Execução da query no banco de dados
        const resultado = await client.query(del, [id, id_usuario]);
        
        // Retorna o favorito que foi deletado
        return resultado.rows[0];
    }
}

module.exports = Favorito;
