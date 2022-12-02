import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:String,
    price:{
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
       
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comment',
        
    },
    isDeleteted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

export const productModel = mongoose.model('product', productSchema)