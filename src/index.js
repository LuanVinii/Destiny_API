// Importa o framework Express para criar o servidor
const express = require('express');
// Cria uma instância do servidor Express
const app = express();

// Importação das rotas para cada recurso: País, Usuário e Favoritos
const rotasPais = require('./routes/pais-routes');
const rotasUsuario = require('./routes/usuario-routes');
const rotasFavoritos = require('./routes/favoritos-routes');

// Carrega as variáveis de ambiente do arquivo .env para o processo
require('dotenv').config();

// Middleware para processar requisições com corpo no formato JSON
app.use(express.json());

// Define as rotas para os recursos: Usuário, País e Favoritos
app.use(rotasUsuario);
app.use(rotasPais);
app.use(rotasFavoritos);

// Define a porta que o servidor irá escutar, usando a variável de ambiente PORTA
const port =  process.env.PORTA;

// Inicializa o servidor, ouvindo na porta especificada
app.listen(port, () => {
    // Exibe no console uma mensagem quando o servidor for iniciado com sucesso
    console.log(`Servidor rodando na porta ${port}`)
})
