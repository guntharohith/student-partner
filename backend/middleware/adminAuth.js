const jwt = require("jsonwebtoken")

const verifyAdminToken = (req, res, next) => {
    const token = req.headers["authorization"]
    if (!token) {
        return res.send("Token is required for authorization.")
    }
    try {
        const decoded = jwt.verify(token.substring(7), "secret_key")
        req.user = decoded
        if (decoded.role !== "admin") {
            return res.send("Not authorized")
        }
    }
    catch {
        return res.send("Not authorized")
    }
    return next()
}

module.exports = verifyAdminToken