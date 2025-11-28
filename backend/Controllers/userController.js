const User = require("../Models/User");
const bcrypt = require("bcrypt");

// CREATE
exports.createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            role
        });

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Error creating user" });
    }
};

// LIST ALL
exports.listUser = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Error listing users" });
    }
};

// GET BY ID
exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Error fetching user" });
    }
};

// UPDATE
exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, password, role } = req.body;

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        let hashedPassword = user.password;
        if (password) hashedPassword = await bcrypt.hash(password, 10);

        await user.update({
            username: username || user.username,
            password: hashedPassword,
            role: role || user.role
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Error updating user" });
    }
};

// DELETE
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.destroy();

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error deleting user" });
    }
};
