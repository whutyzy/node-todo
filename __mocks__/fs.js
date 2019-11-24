const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')
Object.assign(fs, _fs)
const readMocks = {}
const writeMocks = {}
fs.setReadMock = (path, error, data) => {
    readMocks[path] = [error, data]
}
fs.readFile = (path, options, callback) => {
    if (callback === undefined) callback = options
    if (readMocks[path]) {
        callback(readMocks[path][0], readMocks[path][1])
    } else {
        _fs.readFile(path, options, callback)
    }
}
fs.setWriteMock = (path, fn) => {
    writeMocks[path] = fn
}
fs.writeFile = (path, data, options, callback) => {
    if (callback === undefined) callback = options

    if (writeMocks[path]) {
        console.log(data)
        writeMocks[path](path, data, options, callback)
    } else {
        _fs.readFile(path, data, options, callback)
    }

}
module.exports = fs