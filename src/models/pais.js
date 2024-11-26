const client = require('../config/db');

class Pais {

    // Construtor da classe para definir as propriedades do objeto Pais
    constructor(id, nome, idioma_oficial, populacao, area_km2, continente, regiao, capital, maior_cidade, moeda, idh, religiao_predominante, principal_turistico, patrimonio_unesco) {
        this.id = id;                         // ID do país
        this.nome = nome;                     // Nome do país
        this.idioma_oficial = idioma_oficial; // Idioma oficial do país
        this.populacao = populacao;           // População do país
        this.area_km2 = area_km2;             // Área do país em km²
        this.continente = continente;         // Continente onde o país está localizado
        this.regiao = regiao;                 // Região do país
        this.capital = capital;               // Capital do país
        this.maior_cidade = maior_cidade;     // Maior cidade do país
        this.moeda = moeda;                   // Moeda oficial do país
        this.idh = idh;                       // Índice de Desenvolvimento Humano do país
        this.religiao_predominante = religiao_predominante; // Religião predominante no país
        this.principal_turistico = principal_turistico;     // Principal ponto turístico do país
        this.patrimonio_unesco = patrimonio_unesco;         // Quantidade de patrimônios da UNESCO
    }

    // Função para buscar todos os países do banco de dados
    static async obterTodosPaises() {
        // Executa a consulta para pegar todos os países da tabela 'pais'
        const resultado = await client.query('SELECT * FROM pais;');
        return resultado.rows;  // Retorna todos os países encontrados
    }

    // Função para buscar um país específico com base no id
    static async obterPaisPorId(id) {
        // Executa a consulta para pegar um país baseado no ID
        const resultado = await client.query('SELECT * FROM pais WHERE id = $1;', [id]);
        // Verifica se o país foi encontrado. Se não, retorna null
        return resultado.rows.length > 0 ? resultado.rows[0] : null;
    }

    // Função para filtrar países com base nas preferências econômicas (IDH e Moeda)
    static async paisPorEconomia(idh = '', moeda = '') {
        let consulta = `SELECT * FROM pais`;  // Consulta inicial
        const valores = [];  // Valores a serem usados nas condições
        const condicoes = [];  // Condições de filtragem

        // Filtragem para IDH caso seja fornecido
        if (idh) {
            const idhFloat = parseFloat(idh);  // Converte IDH para número de ponto flutuante
            if (!isNaN(idhFloat)) {
                condicoes.push(`idh >= $${condicoes.length + 1}`); // Adiciona a condição de IDH
                valores.push(idhFloat);  // Adiciona o valor do IDH ao array
            } else {
                // Caso o IDH não seja um número válido, exibe um erro
                console.error("Valor de IDH inválido:", idh);
            }
        }

        // Filtragem para Moeda caso seja fornecido
        if (moeda) {
            condicoes.push(`LOWER(moeda) LIKE $${condicoes.length + 1}`);  // Adiciona condição para Moeda
            valores.push('%' + moeda.toLowerCase() + '%');  // Adiciona a moeda no formato desejado (case insensitive)
        }

        // Se houver condições, adiciona a cláusula WHERE na consulta
        if (condicoes.length > 0) {
            consulta += ` WHERE ${condicoes.join(' AND ')}`;  // Junta as condições com 'AND'
        }

        // Executa a consulta com os parâmetros dinâmicos
        const resultado = await client.query(consulta, valores);
        return resultado.rows;  // Retorna os países encontrados
    }

    // Função para filtrar países com base nas preferências turísticas (Patrimônio UNESCO, Região, Idioma)
    static async paisPorTurismo(patrimonio_unesco = '', regiao = '', idioma_oficial = '') {
        let consulta = `SELECT * FROM pais`;  // Consulta inicial
        const valores = [];  // Valores a serem usados nas condições
        let condicoes = [];  // Condições de filtragem

        // Filtragem para Patrimônio UNESCO caso seja fornecido
        if (patrimonio_unesco) {
            condicoes.push(`patrimonio_unesco >= $${condicoes.length + 1}`);  // Adiciona a condição para Patrimônio UNESCO
            valores.push(patrimonio_unesco);  // Adiciona o valor de Patrimônio UNESCO
        }

        // Filtragem para Região caso seja fornecido
        if (regiao) {
            condicoes.push(`LOWER(regiao) LIKE $${condicoes.length + 1}`);  // Adiciona a condição para Região
            valores.push('%' + regiao.toLowerCase() + '%');  // Adiciona a região
        }

        // Filtragem para Idioma Oficial caso seja fornecido
        if (idioma_oficial) {
            condicoes.push(`LOWER(idioma_oficial) LIKE $${condicoes.length + 1}`);  // Adiciona a condição para Idioma Oficial
            valores.push('%' + idioma_oficial.toLowerCase() + '%');  // Adiciona o idioma
        }

        // Se houver condições, adiciona a cláusula WHERE na consulta
        if (condicoes.length > 0) {
            consulta += ` WHERE ${condicoes.join(' AND ')}`;  // Junta as condições com 'AND'
        }

        // Executa a consulta com os parâmetros dinâmicos
        const resultado = await client.query(consulta, valores);
        return resultado.rows;  // Retorna os países encontrados
    }

    // Função para filtrar países com base na religião predominante
    static async paisPorReligiao(religiao_predominante) {
        // Consulta SQL para filtrar países com base na religião predominante
        const consulta = `SELECT * FROM pais WHERE religiao_predominante ~* $1`;
        const valor = [religiao_predominante];
        const resultado = await client.query(consulta, valor);  // Executa a consulta
        return resultado.rows;  // Retorna os países encontrados
    }
}

module.exports = Pais;
