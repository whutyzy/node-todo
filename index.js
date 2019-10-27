const db = require('./db')
const inquirer = require('inquirer')

function printTasks(list) {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'index',
                message: '选择你想操作的任务?',
                choices: [ {name: '创建任务', value: '-2'},...list.map((task, index) => {
                    return {name: `${index + 1}  ${task.done ? '[_]' : '[x]'}${task.task}`, value: index.toString()}
                }),{name: '退出', value: '-1'},]
            }
        ]).then(answer => {
            let index = parseInt(answer.index)
            if (index >= 0) {
                askForAction(list, index)
            }else if(index===-2){
                askForCreateTask(list)
            }
        })

}

function askForAction(list, index) {

    inquirer
        .prompt([{
            type: 'list',
            name: 'action',
            message: '请选择你想执行的操作?',
            choices: [{name: '已完成', value: 'markAsDone'}, {name: '未完成', value: 'markAsUndone'}, {
                name: '改标题',
                value: 'updateTitle'
            }, {name: '删除', value: 'remove'}, {name: '退出', value: 'quit'}]
        }])
        .then(answer => {
            const actionMap = {markAsDone, markAsUndone, updateTitle, remove}
            actionMap[answer.action](list, index)
        })
}
function askForCreateTask(list) {
    inquirer
        .prompt([{
            type: 'input',
            name: 'title',
            message: '请输入任务名'
        }]).then(answer => {
        list.push({task:answer.title,done:false})
        db.write(list)
    })
}
const markAsDone = function (list, index) {
    list[index].done = true
    db.write(list)
}
const markAsUndone = function (list, index) {
    list[index].done = false
    db.write(list)
}
const updateTitle = function (list, index) {
    inquirer
        .prompt([{
            type: 'input',
            name: 'title',
            message: '请输入你想更改的标题'
        }]).then(answer => {
        list[index].task = answer.title
        db.write(list)
    })

}
const remove = function (list, index) {
    list.splice(index, 1)
    db.write(list)
}
module.exports = {
    async add(task) {
        const list = await db.read()
        list.push({task: task, done: false})
        await db.write(list)
    },
    async clear() {
        await db.write([])
    },
    async showAll() {
        const list = await db.read()
        printTasks(list)
    }
}

