const express = require('express')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const crypto = require("crypto");
const User = require("../models/UserModel")
const Resource = require("../models/ResourceModel")
const Note = require("../models/NoteModel")
const LearningPath = require("../models/LearningPathModel")

const verifyToken = require("../middleware/auth")
const verifyAdminToken = require("../middleware/adminAuth")
const transporter = require("../email")
const router = express.Router()
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const upload = multer({
    storage: storage
});
router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, mobileNumber, password } = req.body

        if (!(email && password && firstName && lastName && mobileNumber)) {
            return res.send("all details are required.")
        }

        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return res.send("User already exists.")
        }

        const encryptedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ ...req.body, email: email.toLowerCase(), password: encryptedPassword })
        const token = jwt.sign({ email, password }, "secret_key")
        return res.json(user)
    }
    catch (err) {
        return res.send(err)
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ email, password,role:user.role }, "secret_key")
            user.token = token
            user.save()
            return res.json(
                {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    token: user.token,
                    role: user.role,
                    profileImage: user.profileImage
                }
            )
        }
        return res.send("Invalid credentials!")
    }
    catch (err) {
        return res.send(err)
    }
})

router.get("/", verifyAdminToken, async (req, res) => {
    try {
        const users = await User.find({ role: "user" });
        return res.json(users);
    }
    catch (err) {
        return res.send(err);
    }
})

router.patch("/:id", verifyToken, async (req, res) => {
    try {
        const { firstName, lastName, mobileNumber } = req.body;
        const user = await User.updateOne(
            { email: req.params.id },
            {
                $set: { firstName: firstName, lastName: lastName, mobileNumber: mobileNumber }
            })
        return res.send({ firstName, lastName, mobileNumber });
    }
    catch (err) {
        return res.send(err)
    }
})
router.delete("/:id", verifyAdminToken, async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.params.id })
        await user.save()
        return user
    }
    catch (err) {
        return res.send(err)
    }
})

router.patch("/change-password/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const { password, newPassword } = req.body
        const user = await User.findOne({ email: id })
        if (password === newPassword) {
            return res.send("New password cannot be previous password.")
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            user.password = await bcrypt.hash(newPassword, 10)
            await user.save()
            return res.send(user)
        }
        return res.send("Invalid credentials!")
    }
    catch (err) {
        res.send(err)
    }
})

router.get("/get-resources/:id", verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.id }).populate('resources')
        return res.send(user.resources)
    }
    catch (err) {
        res.send(err)
    }
})

router.get("/get-notes/:id", verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.id }).populate('notes')
        return res.send(user.notes)
    }
    catch (err) {
        res.send(err)
    }
})

router.get("/get-learningpaths/:id", verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.id }).populate('learningPaths')
        return res.send(user.learningPaths)
    }
    catch (err) {
        res.send(err)
    }
})

router.post("/reset-password-email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.send("User doesn't exits.")
        }
        let resetToken = crypto.randomBytes(32).toString("hex");
        user.token = resetToken;
        await user.save();
        const link = `http://localhost:4200/reset-password/${resetToken}/${user._id}`;
        transporter.sendMail({
            from: "shettyrohith968@gmail.com",
            to: req.body.email,
            subject: "Password reset StudentPartner",
            html: `<div>
                    <h5>Hi, ${req.body.email}</h5>
                    <p>You requested to reset your password.</p>
                    <p>Please click the below link to reset your password</p>
                    <a href=${link}>Reset Password</a>
                </div>`

        }, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
        return res.send(user)
    }
    catch (err) {
        res.send(err)
    }
})

router.post('/upload-profile-image', verifyToken, upload.single('profileImage'), async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email })
        user.profileImage = req.file.path
        user.save()
        return res.json( req.file.path )
    }
    catch (err) {
        res.send(err)
    }
})

router.post('/reset-password', async (req, res) => {
    try {
        const { token, userId, password } = req.body
        const user = await User.findById({ _id: userId })
        if (await bcrypt.compare(password, user.password)) {
            return res.send("New password cannot be same as previous password.")
        }
        const resetToken = user.token
        if (!(resetToken && resetToken === token )) {
            return res.send("Invalid or expired password reset token")
        }
        const hash = await bcrypt.hash(password, 10);
        await User.updateOne(
            { _id: userId },
            { $set: { password: hash } },
            { new: true }
        );
        transporter.sendMail({
            from: "shettyrohith968@gmail.com",
            to: user.email,
            subject: "Password changed successfully",
            html: `<div>
                    <h5>Hi, ${user.email}</h5>
                    <p>You password has been changed successfully.</p>
                </div>`

        }, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
        user.token = ""
        await user.save()
        return res.send(user)

    }
    catch (err) {
        res.send(err)
    }
})

router.get('/get-analytics', verifyAdminToken, async (req, res) => {
    try {
        const users = await User.find();
        const notes = await Note.find();
        const resources = await Resource.find();
        const learningPaths = await LearningPath.find();
        return res.json({
            numberOfUsers: users.length-1,
            numberOfNotes: notes.length,
            numberOfResources: resources.length,
            numberOfLearningPaths: learningPaths.length
        })
    }
    catch {
        res.send(err)
    }
})
module.exports = router