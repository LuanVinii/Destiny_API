const { Client }  = require("pg");
require('dotenv').config();

// configurações do meu bd
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_SENHA,
    port: process.env.DB_PORTA,
});

// conexão com o banco
client.connect()
.then(() => console.log('Conectado ao banco de dados com sucesso!'))
.catch(err => console.error('Erro ao se conectar com o banco de dados.', err.stack))

module.exports = client;