const client = require('../config/db');

class Pais {

constructor(id, nome, idioma_oficial, populacao, area_km2, continente, regiao, capital, maior_cidade, moeda, idh, religiao_predominante, principal_turistico, patrimonio_unesco) {
this.id = id;
this.nome = nome;
this.idioma_oficial = idioma_oficial;
this.populacao = populacao;
this.area_km2 = area_km2;
this.continente = continente;
this.regiao = regiao;
this.capital = capital;
this.maior_cidade = maior_cidade;
this.moeda = moeda;
this.idh = idh;
this.religiao_predominante = religiao_predominante;
this.principal_turistico = principal_turistico;
this.patrimonio_unesco = patrimonio_unesco
}

// Função para buscar todos os países do banco de dados
static async obterTodosPaises() {
    const resultado = await client.query('SELECT * FROM pais;');
    return resultado.rows;
}

// Função para buscar um país específico com base no id
static async obterPaisPorId (id){
    const resultado = await client.query('SELECT * FROM pais WHERE id = $1;', [id]);
    return resultado.rows.length > 0 ? resultado.rows[0]: null;
}

// Função para filtrar países com base nas preferências de características economicas 
static async paisPorEconomia(idh = '', moeda = '') {
    let consulta = `SELECT * FROM pais`;
    const valores = [];
    const condicoes = [];

    // Filtragem para IDH caso seja fornecido
    if (idh) {
        // Verifica se IDH não está vazio e converte para número
        const idhFloat = parseFloat(idh);
        if (!isNaN(idhFloat)) {
            condicoes.push(`idh >= $${condicoes.length + 1}`);
            valores.push(idhFloat); // Agora estamos usando idhFloat que é um número
        } else {
            // Caso o IDH não seja um número válido, você pode tratar esse erro ou ignorar.
            console.error("Valor de IDH inválido:", idh);
        }
    }

    // Filtragem para moeda caso seja fornecido
    if (moeda) {
        condicoes.push(`LOWER(moeda) LIKE $${condicoes.length + 1}`);
        valores.push('%' + moeda.toLowerCase() + '%');
    }

    // Se houver condições, adiciona ao SQL, senão, a consulta não tem cláusula WHERE
    if (condicoes.length > 0) {
        consulta += ` WHERE ${condicoes.join(' AND ')}`;
    }

    // Execução da consulta com parâmetros dinâmicos
    const resultado = await client.query(consulta, valores);
    return resultado.rows;
}

static async paisPorTurismo(patrimonio_unesco = '', regiao = '', idioma_oficial = '') {
    let consulta = `SELECT * FROM pais`;
    const valores = [];
    let condicoes = [];

    // Filtragem para patrimônios Unesco caso seja fornecido
    if (patrimonio_unesco) {
        condicoes.push(`patrimonio_unesco >= $${condicoes.length + 1}`);
        valores.push(patrimonio_unesco);
    }

    // Filtragem para região caso seja fornecido
    if (regiao) {
        condicoes.push(`LOWER(regiao) LIKE $${condicoes.length + 1}`);
        valores.push('%' + regiao.toLowerCase() + '%');
    }

    // Filtragem para idioma caso seja fornecido
    if (idioma_oficial) {
        condicoes.push(`LOWER(idioma_oficial) LIKE $${condicoes.length + 1}`);
        valores.push('%' + idioma_oficial.toLowerCase() + '%');
    }

    // Se houver condições, adiciona ao SQL, senão, a consulta não tem cláusula WHERE
    if (condicoes.length > 0) {
        consulta += ` WHERE ${condicoes.join(' AND ')}`;
    }

    // Execução da consulta com parâmetros dinâmicos
    const resultado = await client.query(consulta, valores);
    return resultado.rows;
}

static async paisPorReligiao(religiao_pedrominante) {
    const consulta = `SELECT * FROM pais WHERE religiao_predominante ~* $1`;
    const valor = [religiao_pedrominante];
    const resultado = await client.query(consulta, valor);
    return resultado.rows;
  }
} 

module.exports = Pais;
