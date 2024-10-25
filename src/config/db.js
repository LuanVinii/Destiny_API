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
/*.then(() => {
    const consulta = 'SELECT * FROM pais';
    return client.query(consulta);
})
.then(res =>{
    console.log('Dados: ', res.rows)
})
.catch(err => {
    console.error('Erro ao Executar consulta: ', err.stack);
})
.finally(() => {
    client.end();
})*/
