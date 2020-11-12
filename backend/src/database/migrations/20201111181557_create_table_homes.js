
exports.up = function (knex) {
    return knex.schema.createTable('house', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.string('cellNumber').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();

        table.string('created_at').notNullable();
        table.string('updated_at').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('house');
};

