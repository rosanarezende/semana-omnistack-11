const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    // antes de cada teste
    beforeEach( async () => { // mesmos comandos da linha de comando
        await connection.migrate.rollback() // zere o BD
        await connection.migrate.latest() // executar as migrations dentro do nosso banco de testes
    })

    afterAll(async () => { // depois de todos os testes
        await connection.destroy() // desfazer a conexão do teste com o BD
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs') // rota
            .send({ // quais dados quero enviar
                name: "ONG teste",
                email: "contato@email.com",
                whatsapp: "2799990000",
                city: "Linhares",
                uf: "ES"
            })
        // console.log(response.body)

        // agora o teste
        expect(response.body).toHaveProperty('id') // tenha o id
        expect(response.body.id).toHaveLength(8) // com 8 caracteres
        
    })
})