class ValidacaoPais {

    // Valida parâmetros para consulta por economia (IDH e Moeda)
    static async validarEconomia(req, res, next) {
        const { idh, moeda } = req.query;

        // Verifica se IDH é um número válido, se fornecido
        if (idh && isNaN(idh)) {
            return res.status(400).json({ error: 'IDH deve ser um número válido' });
        }

        // Verifica se moeda é uma string válida, se fornecida
        if (moeda && typeof moeda !== 'string') {
            return res.status(400).json({ error: 'Moeda deve ser uma string válida' });
        }

        next();
    }

    // Valida parâmetros para consulta por turismo (Patrimônio Unesco, Região e Idioma)
    static async validarTurismo(req, res, next) {
        const { patrimonio_unesco, regiao, idioma_oficial } = req.query;

        // Verifica se patrimônio Unesco é um número válido, se fornecido
        if (patrimonio_unesco && isNaN(patrimonio_unesco)) {
            return res.status(400).json({ error: 'Patrimônio Unesco deve ser um número válido' });
        }

        // Verifica se região é uma string válida, se fornecida
        if (regiao && typeof regiao !== 'string') {
            return res.status(400).json({ error: 'Região deve ser uma string válida' });
        }

        // Verifica se idioma oficial é uma string válida, se fornecido
        if (idioma_oficial && typeof idioma_oficial !== 'string') {
            return res.status(400).json({ error: 'Idioma oficial deve ser uma string válida' });
        }

        next();
    }

    // Valida o parâmetro ID para a rota que busca um país específico
    static async validarId(req, res, next) {
        const { id } = req.params;

        // Verifica se o ID é um número válido
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID do país deve ser um número válido' });
        }

        next();
    }

    // Valida parâmetros para consulta por religião
    static async validarReligiao(req, res, next) {
        const { religiao_predominante } = req.query;

        // Verifica se religião predominante é uma string válida, se fornecida
        if (religiao_predominante && typeof religiao_predominante !== 'string') {
            return res.status(400).json({ error: 'Religião predominante deve ser uma string válida' });
        }

        next();
    }
}

module.exports = ValidacaoPais;
