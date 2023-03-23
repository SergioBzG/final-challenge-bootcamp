import {test} from '@japa/runner'
import { getTokenAuthAdmin } from './TestAuthAdmin'

test('deleteQuestion correct', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const response = await client.delete('api/v1/questions/deleteQuestion/16').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('deleteQuestion fail', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const response = await client.delete('api/v1/questions/deleteQuestion/67').header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})