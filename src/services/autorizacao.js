const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class Autorizacao {

    // Função para gerar o token JWT
    static gerarToken(idUsuario) {
        // O segredo da chave (JWT_SECRET) é armazenado em uma variável de ambiente para segurança
        // O token terá um tempo de expiração de 12 horas (12h)
        return jwt.sign({ id: idUsuario }, process.env.JWT_SECRET, { expiresIn: '12h' });
    }

    // Função para criar o hash de senha
    static async criarHash(senha) {
        const voltas = 10;  // Número de "salt rounds" que define a complexidade do hasha
        // A senha é convertida em um hash usando a quantidade de voltas definida
        return await bcrypt.hash(senha, voltas);
    }
}

module.exports = Autorizacao;
