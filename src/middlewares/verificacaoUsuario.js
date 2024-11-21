const Usuario = require('../models/usuario');
const Pais = require('../models/pais'); // Para validar país de residência
const { body, validationResult } = require('express-validator');

class VerificacaoUsuario {

    // Validação para criar um usuário
    static async validarCadastro(req, res, next) {
        // Validação de campos obrigatórios e formatos utilizando o express-validator
        await body('nome').isString().withMessage('Nome deve ser uma string').run(req);
        await body('email').isEmail().withMessage('Email inválido').run(req);
        await body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres').run(req);
        await body('pais_reside').isInt().withMessage('ID do país deve ser um número').run(req);

        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ errors: erros.array() });
        }

        // Verifica se o e-mail já está cadastrado
        const { email, pais_reside } = req.body;
        const usuarioExistente = await Usuario.autenticar(email, '');
        if (usuarioExistente) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }

        // Verifica se o país de residência existe
        const pais = await Pais.obterPaisPorId(pais_reside);
        if (!pais) {
            return res.status(400).json({ message: 'País de residência inválido' });
        }

        next();
    }

    // Valida os campos passados para autenticar o usuário
    static async validarAutenticacao(req, res, next) {
        await body('email').isEmail().withMessage('Email inválido').run(req);
        await body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres').run(req);

        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ errors: erros.array() });
        }

        next();
    }

    // Valida os dados para atualização do usuário
    static async validarAtualizacao(req, res, next) {
        const { nome, email, senha, pais_reside } = req.body;

        // Verifica os campos
        if (nome && typeof nome !== 'string') {
            return res.status(400).json({ message: 'Nome inválido' });
        }
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: 'Email inválido' });
        }
        if (senha && senha.length < 6) {
            return res.status(400).json({ message: 'Senha deve ter pelo menos 6 caracteres' });
        }
        if (pais_reside && typeof pais_reside !== 'number') {
            return res.status(400).json({ message: 'ID de país inválido' });
        }

        // Verifica se o país de residência existe
        if (pais_reside) {
            const pais = await Pais.obterPaisPorId(pais_reside);
            if (!pais) {
                return res.status(400).json({ message: 'País de residência inválido' });
            }
        }

        next();
    }
}

module.exports = VerificacaoUsuario;
