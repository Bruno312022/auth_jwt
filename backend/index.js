const express = require("express");
const sequelize = require("./Config/database");
const userRoutes = require("./Routes/userRoutes");

const port = 3001;
const app = express();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Running");
});

// Users routes
app.use("/users", userRoutes);

// Database sync and server start
sequelize.sync({ alter: true})
    .then(() => {
        console.log("Database connected");
        app.listen(port, () => {
            console.log(`Server running on: http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });
