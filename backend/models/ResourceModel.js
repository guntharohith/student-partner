const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ResourceModel = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        link: { type: String, required: true },
        review: { type: String, required: true },
        rating: { type: String, required: true },
        image: {type:String},
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)
module.exports = mongoose.model('Resource', ResourceModel)
