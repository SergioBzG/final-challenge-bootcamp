import {test} from '@japa/runner'
import { getTokenAuthAdmin } from './TestAuthAdmin'

test('getQuestion', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const response = await client.get('api/v1/questions/getQuestions').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('getOptions', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const response = await client.get('api/v1/questions/getOptions/3').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('getOptions fail', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const response = await client.get('api/v1/questions/getOptions/67').header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})