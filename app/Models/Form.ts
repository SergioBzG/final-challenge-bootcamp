import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Answer from './Answer'

export default class Form extends BaseModel {
  @column({ isPrimary: true }) id: number
  @column() student_id: number
  @column() answer_id: number
  @column() state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User, {
    localKey: 'student_id',
    foreignKey: 'id'
  })
  public student: HasOne<typeof User>

  @hasOne(() => Answer, {
    localKey: 'answer_id',
    foreignKey: 'id'
  })
  public answer: HasOne<typeof Answer>
  
}
