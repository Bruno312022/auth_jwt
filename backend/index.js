const express = require("express");
const sequelize = require("./Config/database");
const userRoutes = require("./Routes/userRoutes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./Models/User"); 
require("dotenv").config({ path: "./.env" });

const port = 3001;
const app = express();

app.use(express.json());

// Users routes
app.use("/users", userRoutes);

// Secrets from .env
const accessSecret = process.env.ACCESS_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Tokens
        const accessToken = jwt.sign(
            { username: user.username, role: user.role },
            accessSecret,
            { expiresIn: "30m" }
        );

        const refreshToken = jwt.sign(
            { username: user.username },
            refreshSecret,
            { expiresIn: "7d" }
        );

        return res.json({
            accessToken,
            refreshToken,
            role: user.role
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Database sync and server start
sequelize.sync({ alter: true })
    .then(() => {
        console.log("Database connected");
        app.listen(port, () => {
            console.log(`Server running on: http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });
