const { Client }  = require("pg");

// configurações do meu bd
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'entidades',
    password: 'root',
    port: 5432,
});

// conexão com o banco
client.connect()
.then(() => console.log('Conectado ao banco de dados com sucesso!'))
.catch(err => console.error('Erro ao se conectar com o banco de dados.', err.stack))

module.exports = client;