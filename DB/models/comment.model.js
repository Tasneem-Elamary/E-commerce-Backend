import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    commentBody: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    DeletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    isDeleteted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

export const commentModel = mongoose.model('comment', commentSchema)