import {test} from '@japa/runner'
import { getTokenAuthAdmin } from './TestAuthAdmin'

test('createRol', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {
        name: "estudiante",
        state: true
    }
    const response = await client.post('api/v1/rol/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('createRol fail', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {}
    const response = await client.post('api/v1/rol/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})