import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

import User from '../model/User'

require('dotenv').config()


let signin = async (req, res) => {
    try {
        // find an user record
        let user = await User.findOne({ "username": req.body.username })

        // check if there is one
        if (!user)
            return res.status('401').json({ error: "User not found" })

        // check if password matches
        const match = await user.comparePassword(req.body.password)
        if (!match) {
            return res.status(400).json({ error: "Username and password don't match" });
        }

        //generate a token signed with userID
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        
        //return json
        return res.json({
            token,
            user: {
                _id: user._id,
                username: user.username
            }
        })
    } catch (err) {
        return res.status('401').json({ error: "Could not signin" })
    }
} 


let signout = async (req, res) => {
    return res.status('200').json({
        message: "Signed out successfully!"
    })
}


let list_all_users = async (req, res) => {
    try {
        let users = await User.find().select('username created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}


let create_user = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save();
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}


let user_id = async (req, res, next, id) => {
    try {
        let user = await User.findById(id).select("username created")

        // if not found, return with error code
        if (!user)
            return res.status('400').json({
                error: "User not found"
            })
        
        // else pass request to next function
        // populate user object
        req.profile = user
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}


let require_signin = expressJwt({
    secret: process.env.JWT_SECRET,
    requestProperty: 'auth',
    algorithms: ['HS256']
})


let is_author = async (req, res, next) => {
    if(req.profile && req.auth && req.profile._id == req.auth._id){
        req.is_author = true 
    }else{
        req.is_author = false
    }
    next()
}


let has_authorization = async (req, res, next) => {
    const authorized = req.auth && req.image && req.image.posted_by._idn == req.auth._id;
    if (!authorized) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}


export default {
    signin, 
    signout, 
    list_all_users,
    create_user, 
    user_id,
    require_signin, 
    is_author, 
    has_authorization
}