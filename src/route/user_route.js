import express from 'express'

import user_controller from '../controller/user_controller'

const router = express.Router()

// signin route
router.route('/signin').post(user_controller.signin)

// signout user
router.route('/signout').get(user_controller.signout)

// get a list of all user or create a new user
router.route('/user').get(user_controller.list_all_users).post(user_controller.create_user)

export default router 