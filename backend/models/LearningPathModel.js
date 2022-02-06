const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LearningPathModel = new Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        type: {type:String},
        topics: [{
            topicName: { type: String, required: true },
            topicDes: { type: String, required: true },
            resources: [{type:String}],
            assessments: [{ type: String }]
        }],
        userId: {type:Schema.Types.ObjectId,ref:'User'}
    }
)


module.exports = mongoose.model('LearningPath', LearningPathModel)