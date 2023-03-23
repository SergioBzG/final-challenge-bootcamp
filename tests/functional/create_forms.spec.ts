import {test} from '@japa/runner'
import { getTokenAuthAdmin } from './TestAuthAdmin'

test('createForm', async ({client, assert}) =>{
    const token = await getTokenAuthAdmin();
    const body = {
        "estudianteId": 4,
        "answers": [9,10]
    }
    const response = await client.post('api/v1/form/postquestions').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('createForm invalid student', async ({client, assert}) =>{
    const token = await getTokenAuthAdmin();
    const body = {
        "estudianteId": 67,
        "answers": [7,8]
    }
    const response = await client.post('api/v1/form/postquestions').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('createForm invalid answer', async ({client, assert}) =>{
    const token = await getTokenAuthAdmin();
    const body = {
        "estudianteId": 67,
        "answers": [23, 45]
    }
    const response = await client.post('api/v1/form/postquestions').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('createForm fail', async ({client, assert}) =>{
    const token = await getTokenAuthAdmin();
    const body = {}
    const response = await client.post('api/v1/form/postquestions').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})