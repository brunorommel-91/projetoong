exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table =>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('ongname').notNull()
        table.string('endrua').notNull()
        table.string('endbairro').notNull()
        table.string('endcidade').notNull()
        table.string('endestado').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false)
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
  
};