const { signup, login } = require('../../controller/auth/signupController');
const authRouter = require('express').Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);


module.exports = authRouter;