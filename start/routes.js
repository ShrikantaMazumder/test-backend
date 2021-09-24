'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'HomeController.index')


Route.group(() => {
  // auth routes
  Route.post('register', 'AuthController.register'),
  Route.post('login', 'AuthController.login'),

  // find user route
  Route.get('user/:userId', 'UserController.getUserById').middleware('auth')

}).prefix('/api/v1')
