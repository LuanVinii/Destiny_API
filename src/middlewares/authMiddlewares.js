// Importa o módulo 'jsonwebtoken' para realizar a verificação e decodificação do token
const jwt = require('jsonwebtoken');

// Middleware para verificar se o usuário está autenticado (verificando o token)
const verificarAuth = (req, res, next) => {
    // Tenta pegar o token do cabeçalho Authorization da requisição
    // O formato esperado é Bearer <token>, então é feito a divisão para pegar apenas o token
    const token = req.headers['authorization']?.split(' ')[1];

    // Se o token não for encontrado no cabeçalho, retorna um erro de 'Token não fornecido'
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Verifica se o token é válido utilizando a chave secreta do ambiente (process.env.JWT_SECRET)
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        // Se houver erro na verificação (token inválido ou expirado), retorna um erro de 'Token inválido'
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // Se o token for válido, adiciona os dados do usuário (decodificados) ao objeto da requisição
        // Isso pode incluir informações como o ID do usuário, que será acessado posteriormente nas rotas
        req.usuarioId = decode.id;

        next();
    });
}

module.exports = verificarAuth;
