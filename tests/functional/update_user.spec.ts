import {test} from '@japa/runner'
import { getTokenAuthAdmin } from './TestAuthAdmin'

test('updateUser', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {
        firstName: "Carmen",
        secondName: "Electra",
        surname: "Kalo",
        secondSurName: "Sora",
        typeDocument: 1,
        documentNumber: "1234537932",
        email: "carmen@unal.edu.co",
        phone: "320000034"
    }
    const response = await client.put('api/v1/user/update/3').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('updateUser ivalid user', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {
        firstName: "Carmen",
        secondName: "Electra",
        surname: "Kalo",
        secondSurName: "Sora",
        typeDocument: 1,
        documentNumber: "1234537932",
        email: "carmen@unal.edu.co",
        phone: "320000000"
    }
    const response = await client.put('api/v1/user/update/67').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})