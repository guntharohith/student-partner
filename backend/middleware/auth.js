const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]
    if (!token) {
        return res.send("Token is required for authorization.")
    }
    try {
        const decoded = jwt.verify(token.substring(7), "secret_key")
        req.user = decoded
    }
    catch {
        return res.send("not authorized")
    }
    return next()
}

module.exports = verifyToken