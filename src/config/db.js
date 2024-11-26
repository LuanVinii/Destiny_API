// Importa o cliente do PostgreSQL
const { Client }  = require("pg");

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Configurações do banco de dados utilizando as variáveis de ambiente
const client = new Client({
    user: process.env.DB_USER,  // Usuário para acessar o banco
    host: process.env.DB_HOST,  // Endereço do servidor do banco
    database: process.env.DB_DATABASE,  // Nome do banco de dados
    password: process.env.DB_SENHA,  // Senha do banco
    port: process.env.DB_PORTA,  // Porta do banco
});

// Conexão com o banco de dados
client.connect()
    .then(() => console.log('Conectado ao banco de dados com sucesso!'))
    .catch(err => console.error('Erro ao se conectar com o banco de dados.', err.stack))

module.exports = client;
