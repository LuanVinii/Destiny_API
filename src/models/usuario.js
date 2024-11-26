const bcrypt = require('bcrypt');
const client = require('../config/db');

// Definindo a classe Usuario
class Usuario {

    // Construtor da classe para definir as propriedades do objeto Usuario
    constructor(id, nome, email, senha, data_registro, pais_reside) {
        this.id = id;               // ID do usuário
        this.nome = nome;           // Nome do usuário
        this.email = email;         // E-mail do usuário
        this.senha = senha;         // Senha do usuário
        this.data_registro = data_registro; // Data de registro do usuário
        this.pais_reside = pais_reside;     // País de residência do usuário
    }

    // Função para cadastrar um novo usuário no banco de dados
    static async cadastrar(nome, email, senha, pais_reside) {
        // Criptografa a senha antes de armazená-la no banco de dados
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const fazerCadastro = `INSERT INTO usuario (nome, email, senha, pais_reside) VALUES ($1, $2, $3, $4) RETURNING *;`;
        const valores = [nome, email, senhaCriptografada, pais_reside]; // Array com os valores para a consulta evitando injeção de SQL
        const resultado = await client.query(fazerCadastro, valores);
        return resultado.rows[0]; // Retorna o usuário recém-cadastrado
    }

    // Função para autenticar um usuário comparando o e-mail e senha fornecidos
    static async autenticar(email, senha) {
        const consulta = `SELECT * FROM usuario WHERE email = $1`;  // Consulta para buscar o usuário pelo e-mail
        const resultado = await client.query(consulta, [email]);   

        if (resultado.rowCount === 0) {
            return null; // Retorna null caso nenhum usuário com o e-mail fornecido seja encontrado
        }

        const usuario = resultado.rows[0]; // Usuário encontrado

        // Comparação da senha fornecida com o hash armazenado no banco de dados
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return null; // Retorna null caso a senha fornecida seja inválida
        }
        return usuario.id; // Retorna o ID do usuário se a autenticação for bem-sucedida
    }

    // Função para buscar um usuário pelo ID
    static async buscar(id) {
        const consulta = `SELECT * FROM usuario WHERE id = $1`;  // Consulta para buscar o usuário pelo ID
        const resultado = await client.query(consulta, [id]);    
        return resultado.rows;  // Retorna o usuário encontrado
    }

    // Função para atualizar os dados do usuário
    static async atualizar(id, nome, email, senha, pais_reside) {
        // Criptografa a nova senha antes de atualizar no banco de dados
        const senhaCriptografada = await bcrypt.hash(senha, 10); 
        const consulta = `UPDATE usuario SET nome = $1, email = $2, senha = $3, pais_reside = $4 WHERE id = $5 RETURNING *;`;
        const valores = [nome, email, senhaCriptografada, pais_reside, id];  // Array com os valores para a consulta evitando injeção de SQL
        const resultado = await client.query(consulta, valores);  // Executa a consulta
        return resultado.rows[0]; // Retorna os dados do usuário atualizado
    }
}

module.exports = Usuario;
