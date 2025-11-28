const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/", userController.createUser);          
router.get("/", userController.listUser);
router.get("/:userId", userController.getUserById);    
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);  

module.exports = router;