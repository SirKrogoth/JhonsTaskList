const { test, expect } = require('@jest/globals');
const database = require('../../../src/config/database');

test('Testando conexão com o banco de dados.', async () => {
    const connection = await database.connect();
    expect(connection).toBeTruthy();
})

test('Testando desconexão com o banco de dados.', async () => {
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})