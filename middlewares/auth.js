const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: 'Access not allow!',
            });
        } 
        
        const sToken = token.split(" ")[1];
        const decode = jwt.verify(sToken, process.env.PRIVET_KEY);
        const id = decode.id;
        const user = await User.findById(id);

        req.user = user;
        next();
        // console.log(token);
    } catch (error) {
        res.status(401).json({
            message: "Authentication failed!",
        })
    }
};