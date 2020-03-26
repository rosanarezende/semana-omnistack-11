
exports.up = function (knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable() // temos certeza do tamanho 2
    })
};

// se der algum problema, o que tenho q desfazer, voltar atrás
exports.down = function (knex) {
    return knex.schema.dropTable('ongs') // precisarei deletar ela
};
