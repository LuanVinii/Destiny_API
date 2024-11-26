const Usuario = require('../models/usuario');
const Autorizacao = require('../services/autorizacao');

class UsuarioController {
    
    // Método para criar um novo usuário
    static async criarUsuario(req, res) {
        // Extrai as informações do usuário (nome, email, senha, e país de residência) do corpo da requisição
        const { nome, email, senha, pais_reside } = req.body;
        try {
            // Cria o hash da senha para garantir que a senha será armazenada de forma segura no banco de dados
            const hashDeSenha = await Autorizacao.criarHash(senha);

            // Chama a função de cadastro do model Usuario.js para criar um novo usuário no banco de dados
            const usuario = await Usuario.cadastrar(nome, email, hashDeSenha, pais_reside);

            // Se o usuário não foi criado corretamente, retorna um erro
            if (!usuario) {
                return res.status(400).json({ message: "O usuário não foi cadastrado corretamente" });
            }

            // Se o usuário for criado com sucesso, retorna os dados do usuário recém-criado
            res.status(201).json(usuario);
        } catch (error) {
            // Caso ocorra algum erro na criação do usuário, o erro é logado e uma mensagem de erro é retornada
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ message: 'Erro ao criar usuário' });
        }
    }

    // Método para autenticar um usuário, verificando se as credenciais (email e senha) são válidas
    static async autenticarUsuario(req, res) {
        const { email, senha } = req.body;

        let idDoUsuario;
        try {
            // Chama a função de autenticação do model Usuario para verificar se o email e senha são válidos
            idDoUsuario = await Usuario.autenticar(email, senha);

            // Se o usuário não for encontrado ou as credenciais estiverem erradas, retorna um erro
            if (!idDoUsuario) {
                return res.status(400).json({ message: "Credenciais inválidas" });
            }
        } catch (error) {
            // Caso ocorra algum erro na autenticação, o erro é logado e uma mensagem de erro é retornada
            console.error("Erro ao autenticar usuário:", error);
            res.status(500).json({ message: "Erro ao autenticar usuário" });
        }

        // Gera um token JWT para o usuário autenticado
        const token = Autorizacao.gerarToken(idDoUsuario);

        // Retorna o token de autenticação com uma mensagem de sucesso
        res.status(200).json({ message: "Usuário autenticado com sucesso", token });
    }

    // Método para buscar as informações de um usuário específico
    static async buscarUsuario(req, res) {
        const usuarioId = req.usuarioId;  // Obtém o ID do usuário a partir do token JWT

        try {
            // Chama a função 'buscar' do model Usuario para encontrar o usuário no banco de dados
            const usuario = await Usuario.buscar(usuarioId);

            // Se o usuário não for encontrado, retorna um erro
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            // Se o usuário for encontrado, retorna os dados do usuário
            res.status(200).json(usuario);
        } catch (error) {
            // Caso ocorra algum erro ao buscar o usuário, o erro é logado e uma mensagem de erro é retornada
            console.error("Erro ao buscar usuário", error);
            res.status(500).json({ message: "Erro ao buscar usuário" });
        }
    }

    // Método para atualizar as informações de um usuário existente
    static async atualizarUsuario(req, res) {
        const usuarioId = req.usuarioId;  // Obtém o ID do usuário a partir do token JWT
        const { nome, email, senha, pais_reside } = req.body;

        try {
            // Gera o hash da senha para garantir que a senha será armazenada de forma segura no banco de dados
            const hashDeSenha = await Autorizacao.criarHash(senha);

            // Chama a função 'atualizar' do model Usuario para atualizar as informações do usuário no banco de dados
            const usuarioAtualizado = await Usuario.atualizar(usuarioId, nome, email, hashDeSenha, pais_reside);

            // Se o usuário não for encontrado ou não for possível atualizar, retorna um erro
            if (!usuarioAtualizado) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            // Se a atualização for bem-sucedida, retorna os dados do usuário atualizado
            res.status(200).json(usuarioAtualizado);
        } catch (error) {
            // Caso ocorra algum erro ao atualizar o usuário, o erro é logado e uma mensagem de erro é retornada
            console.error("Erro ao atualizar usuário", error);
            res.status(500).json({ message: "Erro ao atualizar usuário" });
        }
    }
}

module.exports = UsuarioController;
