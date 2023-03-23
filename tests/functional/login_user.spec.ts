import {test} from '@japa/runner'

test('loginUser', async ({client, assert}) => {
    const body ={
        email: "carmen@unal.edu.co",
        password: "cassandra" 
    }
    const response = await client.post('api/v1/login').json(body)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('loginUser invalid email', async ({client, assert}) => {
    const body ={
        email: "cassandra345@unal.edu.co",
        password: "cassandra" 
    }
    const response = await client.post('api/v1/login').json(body)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('loginUser invalid password', async ({client, assert}) => {
    const body ={
        email: "carmen@unal.edu.co",
        password: "cassandra345" 
    }
    const response = await client.post('api/v1/login').json(body)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('loginUser fail', async ({client, assert}) => {
    const body ={}
    const response = await client.post('api/v1/login').json(body)
    response.assertStatus(400)
    assert.isObject(response.body())
})