const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserModel = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobileNumber: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true, default: 'user' },
        token: { type: String },
        profileImage: {type:String},
        resources: [
            { type: Schema.Types.ObjectId, ref: 'Resource' }
        ],
        learningPaths: [
            { type: Schema.Types.ObjectId, ref: 'LearningPath' }
        ],
        notes: [
            { type: Schema.Types.ObjectId, ref: 'Note' }
        ]
    }
)


module.exports = mongoose.model('User', UserModel)