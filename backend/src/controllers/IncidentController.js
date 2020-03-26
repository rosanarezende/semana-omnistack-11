const connection = require('../database/connection')

module.exports = {

    async index(request, response) {
        const { page = 1} = request.query; // se não existe, 1

        const [count] = await connection('incidents') // pego a primeira posição com os []
            .count()
        console.log(count)

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // relaciona dados de 2 tabelas
            .limit(5) // retorna 5 incidente
            .offset((page - 1)* 5) // pula 5 por página, mas não na 5, q não pode ser multiplicada por 0
            // .select('*')
            .select([ //pq ong e incident tem id - só trago o q eu quiser
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf']) 
        
        response.header('X-Total-Count', count['count(*)']) // voltou no console

        return response.json(incidents)
    },

    async create(request, response) {
        const { title, description, value  } = request.body;
        // id aqui é automático/incremental... 1, 2, 3...
        
        //mas e o id da Ong que está autenticada... virá do headers
        // request.headers; // aqui vem dados de autenticação, localização (como msg em port pra quem mora no Brasil), etc.
        const ong_id = request.headers.authorization // o nome q a gente deu

        const [id] = await connection('incidents').insert({ // coloco as colunas q quero inserir
            title,
            description,
            value,
            ong_id
        })

        // pra acessar o id - se eu não fizesse a desestruturação
        // const id = result[0]

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
        
        if(incident.ong_id !== ong_id) {
            //dará erro - não autorizado
            return response.status(401).json({ error: "Operation not permitted." })
        }

        await connection('incidents').where('id', id).delete()

        return response.status(204).send() // resposta sem conteúdo
    },
}
