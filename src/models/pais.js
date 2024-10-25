const client = require('../config/db');

// Função para buscar todos os países do banco de dados
const obterTodosPaises = async() => {
    const resultado = await client.query('SELECT * FROM pais');
    return resultado.rows;
};

const obterPaisPorId = async(id) => {
    const resultado = await client.query('SELECT * FROM pais WHERE id = $1', [id]);
    return resultado.rows.length > 0 ? resultado.rows[0]: null;
};

module.exports = {obterTodosPaises, obterPaisPorId}