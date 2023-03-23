import {test} from '@japa/runner'
import { getTokenAuthAdmin } from './TestAuthAdmin'

test('createTypeDocument', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {
        name: "Test",
        state: true
    }
    const response = await client.post('api/v1/type-document/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('createTypeDocument fail', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {}
    const response = await client.post('api/v1/type-document/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})