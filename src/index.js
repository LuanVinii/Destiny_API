const express = require('express');
const app = express();
const rotasPais = require('./routes/pais-routes');
const rotasUsuario = require('./routes/usuario-routes');
const rotasFavoritos = require('./routes/favoritos-routes');

require('dotenv').config();
app.use(express.json());
app.use(rotasUsuario);
app.use(rotasPais);
app.use(rotasFavoritos)

const port =  process.env.PORTA;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})