'use strict'

const User = use('App/Models/User')

class UserController {

    // find requested user by id
    async getUserById({ response, params }) {
        try {
            const user = await User.findOrFail(params.userId)
            return response.send(user)
        } catch (error) {
            return response.send(error)
        }
    }
}

module.exports = UserController
