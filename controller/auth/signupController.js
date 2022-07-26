const User = require("../../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 11); 
        const { name, username, email, password, profile } = req.body;
        const user = await User.create({
            name,
            username,
            email,
            password,
            profile,
        });
        res.status(201).json({
            message: `Hello ${name}! Your account has been created!`,
            user
        })
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong!",
        });
    }
};

// Login user
exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                message: "Wrong credentials!",
            });
        }
        const validated = await bcrypt.compare(password, user.password);
        if (!validated) {
            return res.status(400).json({
                message: "Password doesn't match!",
            });
        }

        const token = await jwt.sign({ username, _id: user._id }, process.env.PRIVET_KEY, { expiresIn: "2h" });

        res.status(200).json({
            message: "Login successfully!",
            token,
        });
    } catch (error) {
        res.status(404).json({
            message: "Not found!",
        });
    };
};

