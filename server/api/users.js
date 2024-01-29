const Router = require('express').Router();

const Validation = require("../helpers/validationHelper")
const UsersHelper = require('../helpers/usersHelper');
const GeneralHelper = require('../helpers/generalHelper')

const fileName = 'server/api/users.js'

const list = async (request, reply) => {
    try {
        const response = await UsersHelper.getUsersList();

        return reply
            .status(200)
            .send({
                message: 'Get User List Success',
                data: JSON.parse(response)
            })
    } catch (error) {

        return reply
            .status(400)
            .send(GeneralHelper.errorResponse(error))
    }
}

const add = async (request, reply) => {
    try {
        Validation.usersAddValidation(request.body)

        const { name, age, city } = request.body

        const response = await UsersHelper.addUsers({ name, age, city })

        return reply
            .status(201)
            .send({
                message: 'Add User Success',
                data: response
            })
    } catch (error) {

        return reply
            .status(400)
            .send({
                message: error.details[0].message
            })
    }
}

const update = async (request, reply) => {
    try {


        const { id } = request.params
        const { name, age, city } = request.body

        const response = await UsersHelper.updateUsers({ id, name, age, city })

        return reply
            .status(201)
            .send({
                message: 'Update User Success',
                data: JSON.parse(response)
            })
    } catch (error) {

        return reply
            .status(400)
            .send({
                message: error.message
            })
    }
}

const deleteUser = async (request, reply) => {
    try {
        const { id } = request.params

        const response = await UsersHelper.deleteUser({ id })

        return reply
            .status(200)
            .send({
                message: 'Delete User Success',
                data: JSON.parse(response)
            })
    } catch (error) {

        return reply
            .status(400)
            .send({
                message: error.message
            })
    }
}

Router.get('/list', list)
Router.post('/add', add)
Router.patch('/update/:id', update)
Router.delete('/delete/:id', deleteUser)

module.exports = Router