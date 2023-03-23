import {test} from '@japa/runner'
import { getTokenAuthAdmin } from './TestAuthAdmin'

test('getForm', async ({client, assert}) =>{
    const token = await getTokenAuthAdmin();
    const response = await client.get('api/v1/form/getquestions').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})