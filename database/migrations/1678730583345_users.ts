import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 100).notNullable()
      table.string('second_name', 100).notNullable()
      table.string('surname', 100).notNullable()
      table.string('second_sur_name', 100).notNullable()
      table.integer('type_document').notNullable().references('id').inTable('type_documents')
      table.string('document_number').notNullable()
      table.string('email', 250).notNullable()
      table.string('password', 255)
      table.integer('rol_id').references('id').inTable('roles')
      table.string('phone', 30).notNullable()
      table.boolean('state')

      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
