const express = require('express')
const LearningPath = require('../models/LearningPathModel')
const User = require('../models/UserModel')
const verifyToken = require("../middleware/auth")
const verifyAdminToken = require("../middleware/adminAuth")
const router = express.Router()

router.post('/', verifyToken, async (req, res) => {
    try {
        const learningPath = await LearningPath.create(req.body)
        await learningPath.save()
        const user = await User.findById({ _id: req.body.userId })
        user.learningPaths.push(learningPath)
        await user.save()
        return res.send(learningPath)
    }
    catch (err) {
        return res.send(err)
    }
})

router.get('', verifyAdminToken, async (req, res) => {
    try {
        const learningPaths = await LearningPath.find()
        return res.send(learningPaths)
    }
    catch (err) {
        return res.send(err)
    }
})

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const learningPath = await LearningPath.findById({_id:req.params.id})
        return res.send(learningPath)
    }
    catch (err) {
        return res.send(err)
    }
})

router.delete('/:id', verifyAdminToken, async (req, res) => {
    try {
        const learningPath = await LearningPath.findByIdAndRemove({ _id: req.params.id })
        const user = await User.findById({ _id: learningPath.userId })
        user.learningPaths = user.learningPaths.filter((u) => u !== learningPath._id)
        await user.save()
        return res.send(learningPath)
    }
    catch (err) {
        return res.send(err)
    }
})
module.exports = router