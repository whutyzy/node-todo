#! /usr/bin/env node
const program = require('commander')
const api = require('./index')

program
    .command('add [task]')
    .description('add a task')
    .action(function (...args) {
        const words = args.slice(0, -1).join('')
        api.add(words)
    })
program
    .command('clear')
    .action(function () {
        api.clear()

    })
if(process.argv.length===2){
    api.showAll()
}


