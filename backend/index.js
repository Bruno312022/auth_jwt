const express = require("express");
const sequelize = require("./Config/database");
const port = 3001;
const app = express();
app.use(express.json());


app.get("/", function (req, res) {
    res.send("Running")
})

sequelize.
sync().then(() => {
    console.log("Database connected")
    app.listen(port, () => {
        console.log(`Server running on: http://locahost:${port}`)
    });
})