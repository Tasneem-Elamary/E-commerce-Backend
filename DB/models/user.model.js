import mongoose from 'mongoose'
import encrypt from 'mongoose-encryption'
//import crypto from'crypto'
export const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    age: Number,
    confirmEmail: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        default: "Male",
        enum: ['Male', 'Female']
    },
    Role: {
        type: String,
        default: "user",
        enum: ['user', 'admin']
    },

    isDeleteted: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    lastSeen: Date,
   

}, {
    timestamps: true
})

userSchema.plugin(encrypt, { secret:' encryptSecret', encryptedFields: ['phone'] });
export const userModel =
 mongoose.model('User', userSchema)