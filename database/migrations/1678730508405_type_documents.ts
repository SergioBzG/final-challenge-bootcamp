import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TypeDocuments extends BaseSchema {
  protected tableName = 'type_documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 100).notNullable()
      table.boolean('state')
      
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
