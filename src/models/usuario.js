const bcrypt = require('bcrypt');
const client = require('../config/db');

class Usuario{

    constructor(id, nome, email, senha, data_registro, pais_reside){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.data_registro = data_registro;
        this.pais_reside = pais_reside;
    }

    static async cadastrar(nome, email, senha, pais_reside){
        const fazerCadastro = `INSERT INTO usuario (nome, email, senha, pais_reside) VALUES ($1, $2, $3, $4)  RETURNING *;`;
        const valores = [nome, email, senha, pais_reside]
        const resultado = await client.query(fazerCadastro, valores);
        return resultado.rows[0];
    }

    
    static async autenticar(email, senha){
        const consulta = `SELECT * FROM usuario WHERE email = $1`
        const resultado = await client.query(consulta, [email]);

        if (resultado.rowCount === 0) {
            return null; // Nenhum usuário encontrado
        }

        const usuario = resultado.rows[0];

        // Comparação da senha que o usuário forneceu com o hash de senha que consta no banco de dados
        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if(!senhaValida){
            return null;
        }
        return usuario.id
    }

    static async buscar(id){
        const consulta = `SELECT * FROM usuario WHERE id = $1`;
        const resultado = await client.query(consulta, [id])
        return resultado.rows;
    }

    static async atualizar(id, nome, email, senha, pais_reside){
        const consulta = `UPDATE usuario SET nome = $1, email = $2, senha = $3, pais_reside = $4
      WHERE id = $5  RETURNING *;`;
        const valores = [nome, email, senha, pais_reside, id];
        const resultado = await client.query(consulta, valores);
        return resultado.rows[0]
    }
}

module.exports = Usuario;