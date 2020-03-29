const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

// módulo de rotas do express estará desacoplado em uma nova variável
const routes = express.Router()

// ONGS
routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    // aqui passaremos os parâmetros que queremos validar (podem ser: query, route, body )
    // aqui só tem Body
    [Segments.BODY]: Joi.object().keys({
       name: Joi.string().required(),
       email: Joi.string().required().email(),
       whatsapp: Joi.string().required().min(10).max(11),
       city: Joi.string().required(),
       uf: Joi.string().required().length(2)
    })
}), OngController.create)


routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionController.create)


// CASOS
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number() // se é número - mas não precisa ser obrigatório
    })
}), IncidentController.index)
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required() 
    }).unknown()
}), IncidentController.create)
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete)


routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required() 
            //tem formatos bem específicos, que podíamos usar, como: uuid, regex
    }).unknown()
}), ProfileController.index)


module.exports = routes
