import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: 'Username already exists',
            required: 'Username is required'
        },
        password: {
            type: String,
            required: "Password is required"
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
);

UserSchema.pre('save', function(next){
    let user = this

    // generate a password hash when the password changes (or a new password)
    if (!user.isModified('password')) return next()

    // generate a salt
    bcrypt.genSalt(10, function(err, salt){
        if (err) return next(err)

        // combines the salt and the password to generate a new hash
        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err)
            // overwriting plaintext password with hash
            user.password = hash
            next()
        })
    })
});

// compare passwords method
UserSchema.methods.comparePassword = async function(pass){
    const match = await bcrypt.compare(pass, this.password)
    return match
}

export default mongoose.model("User", UserSchema)