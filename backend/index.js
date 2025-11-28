const express = require("express");
const port = 3001;
const app = express();
app.use(express.json());


app.get("/", function(req, res) {
    res.send("Running")
} )

app.listen(port, () => {
    console.log(`Server running on: http://locahost:${port}`)
});