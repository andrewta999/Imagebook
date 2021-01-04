import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    image: {
        data: Buffer,
        contentType: String
    },
    status: {
        type: String, 
        required: 'Status is required'
    },
    posted_by: { type: mongoose.Schema.ObjectId, ref: 'User' },
    created: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Image', ImageSchema)
