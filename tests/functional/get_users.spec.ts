import {test} from '@japa/runner'
import { getTokenAuthAdmin } from './TestAuthAdmin'

test('getUsers', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const response = await client.get('api/v1/user/getUsers').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('getUser by id', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const response = await client.get('api/v1/user/getUser/3').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('getUser no exists', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const response = await client.get('api/v1/user/getUser/60').header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})