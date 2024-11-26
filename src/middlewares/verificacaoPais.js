class ValidacaoPais {

    // Valida parâmetros para consulta por economia (IDH e Moeda)
    static async validarEconomia(req, res, next) {
        const { idh, moeda } = req.query; // Obtém os parâmetros de consulta 'idh' e 'moeda' da URL

        // Verifica se 'idh' é um número válido, caso tenha sido fornecido
        if (idh && isNaN(idh)) {
            return res.status(400).json({ error: 'IDH deve ser um número válido' }); // Retorna erro se 'idh' não for um número
        }

        // Verifica se 'moeda' é uma string válida, caso tenha sido fornecida
        if (moeda && typeof moeda !== 'string') {
            return res.status(400).json({ error: 'Moeda deve ser uma string válida' }); // Retorna erro se 'moeda' não for uma string
        }

        next();
    }

    // Valida parâmetros para consulta por turismo (Patrimônio Unesco, Região e Idioma)
    static async validarTurismo(req, res, next) {
        const { patrimonio_unesco, regiao, idioma_oficial } = req.query; // Obtém os parâmetros de consulta 'patrimonio_unesco', 'regiao' e 'idioma_oficial'

        // Verifica se 'patrimonio_unesco' é um número válido, caso tenha sido fornecido
        if (patrimonio_unesco && isNaN(patrimonio_unesco)) {
            return res.status(400).json({ error: 'Patrimônio Unesco deve ser um número válido' }); // Retorna erro se 'patrimonio_unesco' não for um número
        }

        // Verifica se 'regiao' é uma string válida, caso tenha sido fornecida
        if (regiao && typeof regiao !== 'string') {
            return res.status(400).json({ error: 'Região deve ser uma string válida' }); // Retorna erro se 'regiao' não for uma string
        }

        // Verifica se 'idioma_oficial' é uma string válida, caso tenha sido fornecido
        if (idioma_oficial && typeof idioma_oficial !== 'string') {
            return res.status(400).json({ error: 'Idioma oficial deve ser uma string válida' }); // Retorna erro se 'idioma_oficial' não for uma string
        }

        next();
    }

    // Valida o parâmetro ID para a rota que busca um país específico
    static async validarId(req, res, next) {
        const { id } = req.params; // Obtém o parâmetro 'id' da URL

        // Verifica se o ID é um número válido
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID do país deve ser um número válido' }); // Retorna erro se 'id' não for um número
        }

        next();
    }

    // Valida parâmetros para consulta por religião
    static async validarReligiao(req, res, next) {
        const { religiao_predominante } = req.query; // Obtém o parâmetro 'religiao_predominante' da URL

        // Verifica se 'religiao_predominante' é uma string válida, caso tenha sido fornecido
        if (religiao_predominante && typeof religiao_predominante !== 'string') {
            return res.status(400).json({ error: 'Religião predominante deve ser uma string válida' }); // Retorna erro se 'religiao_predominante' não for uma string
        }

        next();
    }
}

module.exports = ValidacaoPais; 
