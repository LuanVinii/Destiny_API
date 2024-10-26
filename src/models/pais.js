const client = require('../config/db');

// Função para buscar todos os países do banco de dados
const obterTodosPaises = async() => {
    const resultado = await client.query('SELECT * FROM pais;');
    return resultado.rows;
}

// Função para buscar um país específico com base no id
const obterPaisPorId = async(id) => {
    const resultado = await client.query('SELECT * FROM pais WHERE id = $1;', [id]);
    return resultado.rows.length > 0 ? resultado.rows[0]: null;
}

// Função para listas países com base nas preferências de características economicas 
const paisPorEconomia = async(idh, moeda) => {
const consulta = `SELECT * FROM pais WHERE idh >= $1 AND moeda ~* $2;`;
const valores = [idh, moeda];
const resultado = await client.query(consulta, valores);
return resultado.rows;
}

const paisPorTurismo = async(PatrimonioUnesco, regiao, idioma) =>{
const consulta = `SELECT * FROM pais WHERE patrimonio_unesco >= $1 AND regiao ~* $2 AND idioma_oficial ~* $3;`
const valores = [PatrimonioUnesco, regiao, idioma];
const resultado = await client.query(consulta, valores);
return resultado.rows;
}

const paisPorReligiao = async(religiao) => {
const consulta = `SELECT * FROM pais WHERE religiao_predominante ~* $1;`
const valor = [religiao];
const resultado = await client.query(consulta, valor);
return resultado.rows;
}

module.exports = {obterTodosPaises, obterPaisPorId, paisPorEconomia, paisPorTurismo, paisPorReligiao}