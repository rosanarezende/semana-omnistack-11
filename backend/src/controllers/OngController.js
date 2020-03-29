// const crypto = require('crypto')
const generateUniqueId = require('../utils/generateUniqueId') 
const connection = require('../database/connection')

module.exports = {

    // listar rotas do BD
        // não vai ser usado na aplicação, mas é bom pra acompanhar o que está sendo cadastrado na tabela
    async index(request, response) {
        const ongs = await connection('ongs').select('*')
            // quero selecionar todos os campos de todos os registros dentros da tabela ong
        return response.json(ongs)
    },

    async create(request, response) {
        // const data = request.body
        // console.log(data) // pra garantir que tá chegando

        const { name, email, whatsapp, city, uf } = request.body

        // pra criar o id
            // const id = crypto.randomBytes(4).toString('HEX')
            // agora estou importando, pra exemplificar os testes
        const id = generateUniqueId()

        // conectar com o banco de dados
        await connection('ongs').insert({ // coloco as colunas q quero inserir
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return response.json({ id }) // só devolvo o id da ong
    }
}
