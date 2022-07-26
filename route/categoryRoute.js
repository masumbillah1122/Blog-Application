const { createCategory, getAllCategory } = require("../controller/categoryController");
const { authMiddleware } = require("../middlewares/auth");

const categoryRoute = require("express").Router();

categoryRoute.post("/", authMiddleware, createCategory);
categoryRoute.get("/", getAllCategory);
module.exports = categoryRoute;
