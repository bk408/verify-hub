
const express = require("express");
const cors = require("cors")

require("dotenv").config()
require("./models/db")


const app = express()


const PORT = process.env.PORT || 8080


app.get("/ping", (req, res) => {
    res.send("Pong")
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
})


