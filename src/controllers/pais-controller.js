const { json } = require('express');
const client = require('../config/db');
const { obterTodosPaises, obterPaisPorId, paisPorEconomia, paisPorTurismo, paisPorReligiao } = require('../models/pais');

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
           return res.status(404).json({message: "País não encontrado"});
        }
        res.status(200).json(pais);
    }
    catch (error){
        console.error("Erro ao buscar país: ", error)
        res.status(500).json({message: 'Erro ao buscar país'})
    }
};

const economiaPais = async(req, res) =>{
    try{
        const {idh, moeda} = req.query;

        if(!idh || !moeda){
        return res.status(400).json({message: 'IDH e moeda são obrigatórios'});
        }
        // Converter o IDH para float
        const idhFloat = parseFloat(idh);

        //converte a moeda para minúsculas
        const moedaLower = moeda.toLowerCase();

        // Chamando a função do model
        const paises = await paisPorEconomia(idhFloat, moedaLower);
        if(paises.length == 0){
            return res.status(404).json({message: 'Nenhum país econtrado por essas preferências'});
        }
        res.status(200).json(paises)
    } catch(error){
        console.error("Erro ao buscar países por economia: ", error);
        res.status(500).json({message: 'Erro ao buscar países com base em economia'});
    }
};

const turismoPais = async(req, res) =>{
    try{
        const {patrimonio_unesco, regiao, idioma_oficial} = req.query;

        if (!patrimonio_unesco || !regiao || !idioma_oficial){
            return res.status(400).json({message: 'Patrimônios Unesco, região e idioma são obrigatórios'});
        }

        // Converte o patrimônio Unesco para número
        const PatrimonioUnescoNum = parseInt(patrimonio_unesco);
        // Converte a região para letras minúsculas
        const regiaoLower = regiao.toLowerCase();

        // Converte o idioma para letras minúsculas
        const idiomaLower = idioma_oficial.toLowerCase();

        const paises = await paisPorTurismo(PatrimonioUnescoNum, regiaoLower, idiomaLower);
        if(paises.length == 0){
            return res.status(400).json({message: 'Nenhum país encontrado por essas preferências'});
        }
        res.status(200).json(paises);
    }
    catch(error){
        console.error('Erro ao buscar países por turismo: ', error);
        res.status(500).json({message: 'Erro ao buscar países com base em turismo'});

    }
}

const religiaoPais = async(req, res) => {
    try{
        const religiao_predominante = req.query.religiao_predominante;

        if(!religiao_predominante){
            return res.status(400).json({message: 'Religião predominante é obrigatória'});
        }
        const religiaoLower = religiao_predominante.toLowerCase();

        const paises = await paisPorReligiao(religiaoLower);
        if(paises.length == 0){
            return res.status(400).json({message: 'Nenhum país encontrado por essa preferência'});
        }
        res.status(200).json(paises);
    }
    catch(error){
        console.error('Erro ao buscar países por religião: ', error)
        res.status(500).json({message: 'Erro ao buscar países com base em religião'});
    }
}

module.exports = { buscarPaises, buscarPais, economiaPais, turismoPais, religiaoPais};



