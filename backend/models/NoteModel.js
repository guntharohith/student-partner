const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteModel = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User' }
    }
)
module.exports = mongoose.model('Note',noteModel)