const client = require('../config/db');
const { obterTodosPaises, obterPaisPorId } = require('../models/pais');

//Metódo para buscar todos os países utilizando a função ObterTodosPaises do modelo pais.js
const buscarPaises = async(req, res) => {
    try {
        const paises = await obterTodosPaises();
        res.status(200).json(paises);
    }
    catch (error) {
        console.error("Erro ao buscar países: ", error);
        res.status(500).json({message: 'Erro ao buscar países'});
    }
};

//Metódo para buscar um país específico utilizando a função ObterTodosPaises do modelo pais.js
const buscarPais = async(req, res) => {
    const id = req.params.id;
    try{
        const pais = await obterPaisPorId(id);
        
        if(!pais){
           return res.status(404).json({message: "País não encontrado"})
        }
        res.status(200).json(pais)
    }
    catch (error){
        console.error("Erro ao buscar país: ", error)
        res.status(500).json({message: 'Erro ao buscar país'})
    }
};

module.exports = { buscarPaises, buscarPais };



