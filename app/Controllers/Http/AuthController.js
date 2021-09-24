'use strict'
const User = use('App/Models/User');

class AuthController {

  // create new user
    async register({request, auth, response}) {

      // get only usable data
      const user = await User.create(request.only(['username', 'email', 'password']));

      //generate token for user;
      let token = await auth.generate(user)
      Object.assign(user, token)
      return response.json(user)
    }

    // login existing user
    async login({request, auth, response}) {

      // destructure data from request
      let {email, password} = request.all();
    
      try {
        // attemt login
        if (await auth.attempt(email, password)) {

          // find the user from db
          let user = await User.findBy('email', email)

          // generate token by user data
          let accessToken = await auth.generate(user)

          // return as api response
          return response.json(
              {
                "code": "success", 
                "user_id": user.id,
                "access_token": accessToken
              }
            )
        }

      }
      catch (e) {
        // else it will return error
        return response.json({message: 'You are not registered!'})
      }
    }
}

module.exports = AuthController
