const fs = require('fs')
const path = require('path')
const homeDir = require('os').homedir()
const home = process.env.HOME || homeDir
const dbPath = path.join(home,'.todo')
const db = {
    read(path=dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: 'a+'}, (err, data) => {
                if (err) reject(err)
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (e) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write(task,path=dbPath) {
        return new Promise((resolve, reject) => {
            const list = JSON.stringify(task) + '\n'
            fs.writeFile(path,list,error=>{
                error?reject(error):resolve()
            })
        })

    }
}
module.exports = db