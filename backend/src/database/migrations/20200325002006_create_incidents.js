
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments() // os ids serão criados

        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable() //número float

        // vamos criar um relacionamento com a ONG que criou o caso
        table.string('ong_id').notNullable()
        // criar a chave estrangeira - quando o id estiver preenchido, ele precisa ser da tabela ongs
        table.foreign('ong_id').references('id').inTable('ongs')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents')
};
