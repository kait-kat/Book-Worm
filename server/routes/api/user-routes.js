const userRouter = require('express').Router();
const { authMiddleware } = require("../../utils/auth")
const { createUser, getSingleUser, saveBook, deleteBook, login } = require('../../controllers/user-controller');

userRouter.post("/", createUser)

userRouter.get("/me", authMiddleware, getSingleUser)

userRouter.post("/login", login)

userRouter.put("/", authMiddleware, saveBook)

userRouter.delete("/books/:bookId", authMiddleware, deleteBook)

module.exports = userRouter;