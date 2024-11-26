const Pais = require('../models/pais');

class PaisController {

    // Este método busca todos os países cadastrados no banco de dados
    static async buscarPaises(req, res) {
        try {
            // A função 'obterTodosPaises' do model Pais é chamada para recuperar todos os países
            const paises = await Pais.obterTodosPaises();
            // Se tudo ocorrer bem, retorna a lista de países encontrados para o usuário
            res.status(200).json(paises);
        } catch (error) {
            // Caso algum erro ocorra durante a execução, o erro é logado e uma mensagem de erro é enviada
            console.error("Erro ao buscar países: ", error);
            res.status(500).json({ message: 'Erro ao buscar países' });
        }
    }

    // Este método busca um país específico a partir do ID fornecido na URL
    static async buscarPais(req, res) {
        const id = req.params.id;  // Obtém o ID do país a partir dos parâmetros da URL
        try {
            // A função 'obterPaisPorId' do model Pais é chamada para recuperar o país pelo ID
            const pais = await Pais.obterPaisPorId(id);
            
            // Se o país não for encontrado no banco de dados, retorna uma mensagem informando o erro
            if (!pais) {
                return res.status(404).json({ message: "País não encontrado" });
            }
            // Se o país for encontrado, retorna os dados do país
            res.status(200).json(pais);
        } catch (error) {
            // Caso algum erro ocorra durante a execução, o erro é logado e uma mensagem de erro é enviada
            console.error("Erro ao buscar país: ", error);
            res.status(500).json({ message: 'Erro ao buscar país' });
        }
    }

    // Este método busca países com base em critérios econômicos, como IDH e moeda
    static async economiaPais(req, res) {
        try {
            // Extrai os parâmetros de IDH e moeda
            const { idh = '', moeda = '' } = req.query;

            // A função 'paisPorEconomia' do model Pais é chamada para buscar os países que atendem a esses critérios
            const paises = await Pais.paisPorEconomia(idh, moeda);

            // Caso nenhum país seja encontrado que atenda aos critérios de economia, uma mensagem é retornada
            if (paises.length == 0) {
                return res.status(404).json({ message: 'Nenhum país encontrado por essas preferências' });
            }
            // Caso países sejam encontrados, retorna a lista de países encontrados
            res.status(200).json(paises);
        } catch (error) {
            // Se ocorrer algum erro na execução da função, o erro é logado e uma mensagem de erro é retornada
            console.error("Erro ao buscar países por economia: ", error);
            res.status(500).json({ message: 'Erro ao buscar países com base em economia' });
        }
    }

    // Este método busca países com base em critérios turísticos, como quantidade de patrimônios da UNESCO, região e idioma oficial
    static async turismoPais(req, res) {
        try {
            // Extrai os parâmetros de patrimônio da UNESCO, região e idioma oficial
            const { patrimonio_unesco = '', regiao = '', idioma_oficial = '' } = req.query;

            // A função 'paisPorTurismo' do model Pais é chamada para buscar os países que atendem a esses critérios
            const paises = await Pais.paisPorTurismo(patrimonio_unesco, regiao, idioma_oficial);

            // Se nenhum país for encontrado com esses critérios de turismo, retorna uma mensagem informando isso
            if (paises.length == 0) {
                return res.status(400).json({ message: 'Nenhum país encontrado por essas preferências' });
            }
            // Caso países sejam encontrados, retorna a lista de países encontrados
            res.status(200).json(paises);   
        } catch (error) {
            // Se ocorrer algum erro durante a execução da função, o erro é logado e uma mensagem de erro é retornada
            console.error('Erro ao buscar países por turismo: ', error);
            res.status(500).json({ message: 'Erro ao buscar países com base em turismo' });
        }
    }

    // Este método busca países com base na religião predominante
    static async religiaoPais(req, res) {
        try {
            // Extrai o parâmetro de religião predominante
            const religiao_predominante = req.query.religiao_predominante;

            // Converte o valor da religião para minúsculas para garantir que a busca seja feita de forma consistente
            const religiaoLower = religiao_predominante.toLowerCase();

            // A função 'paisPorReligiao' do model Pais é chamada para buscar os países com base na religião predominante
            const paises = await Pais.paisPorReligiao(religiaoLower);

            // Se nenhum país for encontrado com a religião fornecida, retorna uma mensagem informando isso
            if (paises.length == 0) {
                return res.status(400).json({ message: 'Nenhum país encontrado por essa preferência' });
            }
            // Caso países sejam encontrados, retorna a lista de países encontrados
            res.status(200).json(paises);
        } catch (error) {
            // Se ocorrer algum erro durante a execução da função, o erro é logado e uma mensagem de erro é retornada
            console.error('Erro ao buscar países por religião: ', error);
            res.status(500).json({ message: 'Erro ao buscar países com base em religião' });
        }
    }
}

module.exports = PaisController;
