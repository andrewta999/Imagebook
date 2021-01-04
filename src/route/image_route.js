import express from 'express'

import image_controller from '../controller/image_controller'
import user_controller from '../controller/user_controller'

const router = express.Router()

// upload a new image
router.route('/image/new/:userId').post(user_controller.require_signin, image_controller.create_image)

// get all images of an user
router.route('/image/:userId').get(user_controller.is_author, image_controller.list_by_user)

// delete an image
router.route('/image/:imageId').delete(user_controller.require_signin, user_controller.has_authorization, 
                                      image_controller.delete_image)

                                      
router.param('userId', user_controller.user_id)
router.param('imageId', image_controller.image_id)

export default router 
