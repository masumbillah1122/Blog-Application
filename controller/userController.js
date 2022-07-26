const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find()
        res.status(200).json(user);
    } catch (error) {
        return res.status(401).json({
            message: "Something went wrong!",
        });
    }
};

// Update Profile
exports.updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "Wrong user!",
            });
        };
        req.body.password = await bcrypt.hash(req.body.password, 11);
        const updateUser = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
        });
        res.status(200).json({
            success: "Profile updated successfully",
        })
    } catch (error) {
        return res.status(401).json({
            message: "You can update only your account",
        });
    }
};

// Delete Users
exports.deleteUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "Wrong user",
            });
        };
        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(200).json({
            success: "User deleted successfully",
            deletedUser,
        });
    } catch (error) {
        res.status(401).json({
            message: "You can update only your account",
        });
    }
};