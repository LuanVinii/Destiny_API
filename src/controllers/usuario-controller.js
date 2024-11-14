const Usuario = require('../models/usuario');
const Autorizacao = require('../services/autorizacao');

class UsuarioController{
    
    // Método parar criar um usuário novo, utilizando a função cadastrar do usuario.js
    static async criarUsuario(req, res){
        const {nome, email, senha, pais_reside} = req.body;
        try{
            // Será gerado o hash de senha
            const hashDeSenha  = await Autorizacao.criarHash(senha)

            // Criação do usuário com a senha criptografada
            const usuario = await Usuario.cadastrar(nome, email, hashDeSenha, pais_reside)

            if (!usuario) {
                return res.status(400).json({ message: "O usuário não foi cadastrado corretamente" });
            }            
            res.status(201).json(usuario)
        }
        catch(error){
            console.error("Erro ao criar usuário:", error)
            res.status(500).json({message: 'Erro ao criar usuário'})
        }
    }

    static async autenticarUsuario(req, res){
        const {email, senha} = req.body;

        let idDoUsuario;
        try{
            // Autenticação do usuário
            idDoUsuario = await Usuario.autenticar(email, senha)

            if (!idDoUsuario){
                return res.status(400).json({message: "Credenciais inválidas"})
            }
        } catch(error){
            console.error("Erro ao autenticar usuário:", error)
            res.status(500).json({message: "Erro ao autenticar usuário"})
        }

        const token = Autorizacao.gerarToken(idDoUsuario);

        res.status(200).json({message: "Usuário autenticado com sucesso", token})


    }

    static async buscarUsuario(req, res){
        const usuarioId = req.usuarioId;
        try{
            const usuario = await Usuario.buscar(usuarioId)
            if(!usuario){
                return res.status(404).json({message: "Usuario não encontrado"});
            }
            res.status(200).json(usuario)
        }
        catch(error){
            console.error("Erro ao buscar usuário", error);
            res.status(500).json({message: "Erro ao buscar usuário"})
        }
    }
    static async atualizarUsuario(req, res){
        const usuarioId = req.usuarioId
        const {nome, email, senha, pais_reside} = req.body;
        try{
            const usuarioAtualizado = await  Usuario.atualizar(usuarioId, nome, email, senha, pais_reside)
            if(!usuarioAtualizado){
                return res.status(404).json({message: "Usuário não encontrado"})
            }
            res.status(200).json(usuarioAtualizado)
        }
        catch(error){
            console.error("Erro ao atualizar usuário", error)
            res.status(500).json({message: "Erro ao atualizar usuário"})
        }
    }
}

module.exports = UsuarioController;