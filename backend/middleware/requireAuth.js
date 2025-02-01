
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // verify authentication

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" })

    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET) //verifys the token

        req.user = await User.findOne({_id}).select('_id')
        next()


    } catch (error) { //if not
        console.log(error)
        res.status(401).json({ error: "Request is not authorized" })
    }

}

module.exports = requireAuth