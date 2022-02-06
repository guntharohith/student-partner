const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth.js')
const verifyAdminToken = require('../middleware/adminAuth.js')
const Note = require('../models/NoteModel')
const User = require('../models/UserModel')

router.post('/', verifyToken, async (req, res) => {
    try {
        const note = await Note.create(req.body)
        await note.save()

        const user = await User.findById({ _id: req.body.userId })
        user.notes.push(note)
        await user.save()
        res.send(note)
    }
    catch (err) {
        return res.send(err)
    }
})

router.get('/', verifyAdminToken, async (req, res) => {
    try {
        const notes = await Note.find()
        return res.send(notes)
    }
    catch (err) {
        return res.send(err)
    }
})

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const note = await Note.findById({ _id: req.params.id })
        return res.send(note)
    }
    catch (err) {
        return res.send(err)
    }
})

router.get('/getNoteByName/:name', verifyToken, async (req, res) => {
    try {
        const note = await Note.findOne({ name: req.params.name })
        return res.send(note)
    }
    catch (err) {
        return res.send(err)
    }
})
router.patch('/:id', verifyToken, async (req, res) => {
    try {
        const note = await Note.updateOne(
            { _id: req.params.id },
            { $set: { description: req.body.description } },
            { new: true }
        )
        return res.send(note)
    }
    catch (err) {
        return res.send(err)
    }
})


router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const note = await Note.findByIdAndRemove({ _id: req.params.id })
        const user = await User.findById({ _id: note.userId })
        user.notes = user.notes.filter((u) => u !== note._id)
        await user.save()
        return res.send(note)
    }
    catch (err) {
        return res.send(err)
    }
})
module.exports = router