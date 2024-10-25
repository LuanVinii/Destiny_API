const express = require('express');
const app = express();
const rotasPais = require('./routes/pais-routes');
//const rotasUsuario = require('./routes/usuario-routes');
//const rotasFavoritos = require('./routes/favoritos-routes');

app.use(express.json());
app.use(rotasPais);

const port =  3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})