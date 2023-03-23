import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Roles from './Rol'
import TypeDocument from './TypeDocument'

export default class User extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public first_name: string
  @column() public second_name: string
  @column() public surname: string
  @column() public second_sur_name: string
  @column() public type_document: number
  @column() public document_number: string
  @column() public email: string
  @column() public password: string
  @column() public rol_id: number
  @column() public phone: string
  @column() public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Roles, {
    localKey: 'rol_id',
    foreignKey: 'id'
  })
  public rol: HasOne<typeof Roles>

  @hasOne(() => TypeDocument, {
    localKey: 'type_document',
    foreignKey: 'id'
  })
  public typeDocument: HasOne<typeof TypeDocument>
  
}
