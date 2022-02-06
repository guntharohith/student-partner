const express = require('express')
const Resource = require('../models/ResourceModel')
const User = require('../models/UserModel')
const verifyToken = require("../middleware/auth")
const verifyAdminToken = require("../middleware/adminAuth")

const router = express.Router()

router.post('/', verifyToken, async (req, res) => {
    try {
        const resource = await Resource.create(req.body)
        await resource.save()
        const user = await User.findById({ _id: req.body.userId })
        user.resources.push(resource)
        await user.save()
        return res.send(resource)
    }
    catch (err) {
        return res.send(err)
    }
})

router.get('', verifyToken, async (req, res) => {
    try {
        const resources = await Resource.find()
        return res.send(resources)
    }
    catch (err) {
        return res.send(err)
    }
})

router.delete('/:id', verifyAdminToken, async (req, res) => {
    try {
        const resource = await Resource.findByIdAndRemove({ _id: req.params.id })
        const user = await User.findById({ _id: resource.userId })
        user.resources = user.resources.filter((u) => u !== resource._id)
        await user.save()
        return res.send(resource)
    }
    catch (err) {
        return res.send(err)
    }
})
module.exports = router