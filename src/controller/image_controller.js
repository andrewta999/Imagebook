import formidable from 'formidable'
import fs from 'fs'

import Image from '../model/Image'

let create_image = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }

        let new_image = new Image(fields)
        new_image.posted_by = req.profile

        if (files.image) {
            new_image.image.data = fs.readFileSync(files.image.path)
            new_image.image.contentType = files.image.type
        }

        try {
            let result = await new_image.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: err
            })
        }
    })
}


let list_by_user = async (req, res) => {
    const is_author = req.is_author
    const user_id = req.profile._id

    try {
        let images
        if (is_author) {
            // if this is the author, get all images
            images = await Image.find({ posted_by: user_id }).populate('posted_by', '_id username').sort('-created').exec()
        } else {
            // if not, only get the public ones
            images = await Image.find({ posted_by: user_id, status: "public" }).populate('posted_by', '_id username')
                .sort('-created').exec()
        }
        res.json(images)
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}


let delete_image = async (req, res) => {
    const image = req.image
    try {
        let deleted_image = image.deleteOne()
        res.json(deleted_image)
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}


let image_id = async (req, res, next, id) => {
    try {
        let image = await Image.findById(id).populate('posted_by', '_id username').exec();
        if (!image)
            return res.status('400').json({
                error: "Image not found"
            })
        req.image = image
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve use post"
        })
    }
}


export default {
    create_image,
    delete_image,
    list_by_user,
    image_id
}