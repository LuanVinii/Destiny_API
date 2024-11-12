const jwt = require('jsonwebtoken');

const verificarAuth = (req, res, next) => {
    // Pegando o token do cabeçalho Authorization
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token){
        return res.status(401).json({message: 'Token não fornecido'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) =>{
        if(err){
            return res.status(401).json({message: 'Token inválido'})
        }
        
        // Adiciona os dados do usuário ao objeto de requisição
        req.usuarioId = decode.id
        // Chama o próximo middleware ou controller
        next();
    });
}

module.exports = verificarAuth;