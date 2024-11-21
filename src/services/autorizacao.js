const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class Autorizacao{

    // Função para gerar o token JWT
    static gerarToken(idUsuario){
        return jwt.sign({id: idUsuario}, process.env.JWT_SECRET, {expiresIn: '12h'})
    }
    
    // Função para criar o hash de senha
    static async criarHash(senha){
        const voltas = 10;
        return await bcrypt.hash(senha, voltas)
    }
}

module.exports = Autorizacao;