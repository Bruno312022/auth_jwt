const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const authMiddleware = require("../Middleware/authMiddleware")
const jwt = require("jsonwebtoken")

router.post("/", authMiddleware, userController.createUser);          
router.get("/", authMiddleware, userController.listUser);
router.get("/:userId", authMiddleware, userController.getUserById);    
router.put("/:userId", authMiddleware, userController.updateUser);
router.delete("/:userId", authMiddleware, userController.deleteUser);  

module.exports = router;