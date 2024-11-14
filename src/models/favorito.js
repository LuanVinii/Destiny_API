const client = require('../config/db');

class Favorito{

    constructor(id, id_usuario, id_pais, data_adicionado, notas, prioridade){
        this.id = id;
        this.id_usuario = id_usuario;
        this.id_pais = id_pais;
        this.data_adicionado = data_adicionado;
        this.notas = notas;
        this.prioridade = prioridade;
    }

    static async adicionarFav(id_usuario, id_pais, notas, prioridade){
        const add = `INSERT INTO favorito (id_usuario, id_pais, notas, prioridade)
                        VALUES ($1, $2, $3, $4) RETURNING *`;
        const valores = [id_usuario, id_pais, notas, prioridade];
        const resultado = await client.query(add, valores);
        return resultado.rows[0];
    }

    static async listarFav(id_usuario){
        const consultar = `SELECT * FROM favorito WHERE id_usuario = $1`
        const resultado = await client.query(consultar, [id_usuario]);
        return resultado.rows;
    }

    static async atualizarFav(id, id_usuario, id_pais, notas, prioridade) {
        const att = `UPDATE favorito 
                     SET id_pais = $1, notas = $2, prioridade = $3 
                     WHERE id = $4 AND id_usuario = $5 RETURNING *`;
        const valores = [id_pais, notas, prioridade, id, id_usuario];  // Ordem correta dos parâmetros
        const resultado = await client.query(att, valores);
        return resultado.rows[0];
    }
    

    static async removerFav(id, id_usuario){
        const del = `DELETE FROM favorito WHERE id = $1 AND id_usuario = $2 RETURNING *`;
        const resultado = await client.query(del, [id, id_usuario])
        return  resultado.rows[0];
    }
}

module.exports = Favorito;