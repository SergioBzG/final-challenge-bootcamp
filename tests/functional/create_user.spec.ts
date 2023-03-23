import {test} from '@japa/runner'
import {getTokenAuth} from './TestAuth'
import { getTokenAuthAdmin } from './TestAuthAdmin'

test('createUser', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {
        "firstName": "Amparo",
        "secondName": "Rida",
        "surname": "Kalo",
        "secondSurName": "Sora",
        "typeDocument": 1,
        "documentNumber": "128956732",
        "email": "amparo@unal.edu.co",
        "password": "Amparo",
        "phone": "32123122314",
        "rolId": 2
    }
    const response = await client.post('api/v1/user/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('createUser invalid email', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {
        firstName: "Carmen",
        secondName: "Rida",
        surname: "Kalo",
        secondSurName: "Sora",
        typeDocument: 1,
        documentNumber: "12345379354",
        email: "carmen@unal.edu.co",
        password: "carmen",
        phone: "32123122314",
        rolId: 2
    }
    const response = await client.post('api/v1/user/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('createUser invalid document', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {
        firstName: "Carmen",
        secondName: "Rida",
        surname: "Kalo",
        secondSurName: "Sora",
        typeDocument: 1,
        documentNumber: "1234537932",
        email: "carmen01@unal.edu.co",
        password: "carmen",
        phone: "32123122314",
        rolId: 2
    }
    const response = await client.post('api/v1/user/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('createUser fail', async ({client, assert}) => {
    const token = await getTokenAuthAdmin()
    const body = {}

    const response = await client.post('api/v1/user/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('createUser no permission', async ({client, assert}) => {
    const token = await getTokenAuth() //No admin
    const body = {
        firstName: "Cassandra",
        secondName: "Rida",
        surname: "Kalo",
        secondSurName: "Sora",
        typeDocument: 1,
        documentNumber: "123456798",
        email: "cassandra@unal.edu.co",
        password: "cassandra",
        phone: "32123122314",
        rolId: 1
    }
    const response = await client.post('api/v1/user/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(401)
    assert.isObject(response.body())
})

test('createUser no token', async ({client, assert}) => {
    const body = {
        firstName: "Cassandra",
        secondName: "Rida",
        surname: "Kalo",
        secondSurName: "Sora",
        typeDocument: 1,
        documentNumber: "123456798",
        email: "cassandra@unal.edu.co",
        password: "cassandra",
        phone: "32123122314",
        rolId: 1
    }
    const response = await client.post('api/v1/user/create').json(body)
    response.assertStatus(401)
    assert.isObject(response.body())
})
