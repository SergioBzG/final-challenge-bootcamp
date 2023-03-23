import {test} from '@japa/runner'
import { getTokenAuthAdmin } from './TestAuthAdmin'

test('createQuestion', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {
        "question": "¿Test questions?",
        "options": [
            {
                "opcion":"Vida",
                "iscorrect":true
            },{
                "opcion":"Morte",
                "iscorrect":false
            },{
                "opcion":"Loop",
                "iscorrect":false
            },{
                "opcion":"Soan",
                "iscorrect":false
            } ]
    }
    const response = await client.post('api/v1/questions/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('createQuestion fail', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {}
    const response = await client.post('api/v1/questions/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})