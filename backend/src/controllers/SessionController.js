const connection = require('../database/connection')

module.exports = {
    async create(request, response) {
        const { id } = request.body; // id da ong q quero fazer login
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first()
        if(!ong) { // se a ong não existe
            return response.status(400).json({ error: "No ONG found whith this ID"})
        }
        return response.json(ong)
    },
}
