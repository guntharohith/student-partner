const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/UserRoute')
const resoureRoute = require('./routes/ResourceRoute')
const learningPathRoute = require('./routes/LearningPathRoute')
const noteRoute = require('./routes/NoteRoute')
const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
mongoose
    .connect("mongodb://localhost/studentPartner", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));
app.use('/uploads', express.static('uploads'));
app.use('/users', userRoute)
app.use('/resources', resoureRoute)
app.use('/learningpaths', learningPathRoute)
app.use('/notes',noteRoute)
app.listen(8080,() => console.log("server started"))