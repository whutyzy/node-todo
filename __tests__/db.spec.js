const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')


describe('db', () => {
    it('can be read', async () => {
        const data = {task: 'mock', done: false}
        fs.setReadMock('/xxx', null, JSON.stringify(data))
        const result = await db.read('/xxx')
        expect(result).toStrictEqual(data)
    })

})

describe('write', () => {
    it('can be write', async () => {
        let fakeFiles = []
        fs.setWriteMock('/yyy', (path,data,options,callback)=>{
            fakeFiles = data
            callback(null)
        })
        const list = [{task:'writeMock',done:false}]
        await db.write(list,'/yyy')
        expect(fakeFiles).toStrictEqual(JSON.stringify(list) + '\n')
    })

})