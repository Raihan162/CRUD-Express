const Router = require('express').Router();

const UsersHelper = require('../helpers/usersHelper');
const GeneralHelper = require('../helpers/generalHelper')

const fileName = 'server/api/users.js'

const list = async (request, reply) => {
    try {
        const response = await UsersHelper.getUsersList();
        // console.log(JSON.parse(response), '<<<<<<< RES USERS')

        return reply.send(JSON.parse(response))
    } catch (error) {
        // console.log([fileName, 'list', 'ERROR'], { info: `${error}` }, '<<<<<<<<<<<<<<< ERR USERS');

        return reply.send(GeneralHelper.errorResponse(error))
    }
}

const add = async (request, reply) => {
    try {
        const { name, age, city } = request.body

        const response = await UsersHelper.addUsers({ name, age, city })

        // console.log(response, '<<<<<<<<<< RESPONSE USER')
        return reply.send(response)
    } catch (error) {
        console.log(error)
        return reply.send(GeneralHelper.errorResponse(error))
    }
}

const update = async (request, reply) => {
    try {
        const { id } = request.params
        const { name, age, city } = request.body

        const response = await UsersHelper.updateUsers({ id, name, age, city })

        return reply.send(JSON.parse(response))
    } catch (error) {
        console.log(error)
        // return reply.send(GeneralHelper.errorResponse(error))
    }
}

const deleteUser = async (request, reply) => {
    try {
        const { id } = request.params

        const response = await UsersHelper.deleteUser({ id })

        return reply.send(JSON.parse(response))
    } catch (error) {
        console.log(error)
        return reply.send(GeneralHelper.errorResponse(error))
    }
}

Router.get('/list', list)
Router.post('/add', add)
Router.patch('/update/:id', update)
Router.delete('/delete/:id', deleteUser)

module.exports = Router