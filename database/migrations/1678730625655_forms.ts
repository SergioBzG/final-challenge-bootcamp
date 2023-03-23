import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Forms extends BaseSchema {
  protected tableName = 'forms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('student_id').references('id').inTable('users')
      table.integer('answer_id').references('id').inTable('answers')
      table.boolean('state')
      
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
