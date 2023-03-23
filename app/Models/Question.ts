import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public question: string
  @column() public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Answer, {
    localKey: 'id',
    foreignKey: 'question_id'
  })
  public options: HasMany<typeof Answer>
  
}
