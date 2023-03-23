import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'

export default class Answer extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public option: string
  @column() public is_correct: boolean
  @column() public question_id: number
  @column() public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Question, {
    localKey: 'question_id',
    foreignKey: 'id'
  })
  public question: HasOne<typeof Question>
}
