'use strict'
const User = use('App/Models/User');

class AuthController {
    async register({request, auth, response}) {
      const user = await User.create(request.only(['username', 'email', 'password']));
      //generate token for user;
      let token = await auth.generate(user)
      Object.assign(user, token)
      return response.json(user)
    }

    async login({request, auth, response}) {
      let {email, password} = request.all();
    
      try {
        if (await auth.attempt(email, password)) {
          let user = await User.findBy('email', email)
          let accessToken = await auth.generate(user)
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
        console.log(e)
        return response.json({message: 'You are not registered!'})
      }
    }
}

module.exports = AuthController
