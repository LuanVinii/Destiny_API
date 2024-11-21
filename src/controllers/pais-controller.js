const Pais = require('../models/pais');

class PaisController{
//Metódo para buscar todos os países utilizando a função ObterTodosPaises do modelo pais.js
static async buscarPaises(req, res){
    try {
        const paises = await Pais.obterTodosPaises();
        res.status(200).json(paises);
    }
    catch (error) {
        console.error("Erro ao buscar países: ", error);
        res.status(500).json({message: 'Erro ao buscar países'});
    }
}

//Metódo para buscar um país específico utilizando a função ObterPaisPorId do modelo pais.js
static async buscarPais(req, res){
    const id = req.params.id;
    try{
        const pais = await Pais.obterPaisPorId(id);
        
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

static async economiaPais(req, res){
    try{
        const {idh = '', moeda = ''} = req.query;

        // Chamando a função do model
        const paises = await Pais.paisPorEconomia(idh, moeda);
        if(paises.length == 0){
            return res.status(404).json({message: 'Nenhum país econtrado por essas preferências'});
        }
        res.status(200).json(paises)
    } catch(error){
        console.error("Erro ao buscar países por economia: ", error);
        res.status(500).json({message: 'Erro ao buscar países com base em economia'});
    }
};

static async turismoPais(req, res){
    try{
        const {patrimonio_unesco = '', regiao = '', idioma_oficial = ''} = req.query;

        const paises = await Pais.paisPorTurismo(patrimonio_unesco, regiao, idioma_oficial);
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

static async religiaoPais(req, res){
    try{
        const religiao_predominante = req.query.religiao_predominante;

        const religiaoLower = religiao_predominante.toLowerCase();

        const paises = await Pais.paisPorReligiao(religiaoLower);
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
}

module.exports = PaisController;



