const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        //acesso os dados da ong que tá logada
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*')
        return response.json(incidents)
    }
}
