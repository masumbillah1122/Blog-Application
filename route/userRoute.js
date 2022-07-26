const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const { authMiddleware } = require('../middlewares/auth');

const userRoute = require('express').Router();

userRoute.get("/", getAllUsers);
userRoute.put("/:userId", authMiddleware, updateUser);
userRoute.delete("/:userId", authMiddleware, deleteUser);


module.exports = userRoute;