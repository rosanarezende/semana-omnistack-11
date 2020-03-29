const generateUniqueId = require('../../src/utils/generateUniqueId') 

describe('Generate Unique ID', () => { // Como pode testar várias coisas no mesmo arquivo, coloco uma categoria
    // vamos adicionar nossos testes

    it('should generate unique id', () => { // deve gerar um ID exclusivo
        // o que espero, ex:
            // expect(2 + 2).toBe(4) | npm test - passed
            // expect(2 + 2).toBe(5) | npm teste - failed
        
        const id = generateUniqueId()
        expect(id).toHaveLength(8) //espero que esse id tenha 8 caracteres
    })

}) 


