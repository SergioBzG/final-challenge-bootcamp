import {test} from '@japa/runner'
import { getTokenAuthAdmin } from './TestAuthAdmin'

test('updateQuestion', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {
        "question": "¿Test update45?"
    }
    const response = await client.put('api/v1/questions/updateQuestion/3').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('updateQuestion fail', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {
        "question": "¿Test update45?"
    }
    const response = await client.put('api/v1/questions/updateQuestion/67').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('updateAnswer', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {
        "opcion": "Test option",
        "iscorrect": false
    }
    const response = await client.put('api/v1/questions/updateAnswer/10').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('updateAnswer fail', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {
        "opcion": "Test option",
        "iscorrect": false
    }
    const response = await client.put('api/v1/questions/updateAnswer/67').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})