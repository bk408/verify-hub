
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const authRouter = require("./router/authRouter")

require("dotenv").config()
require("./models/db")


const app = express()


const PORT = process.env.PORT || 8080


app.get("/ping", (req, res) => {
    res.send("Pong")
})

app.use(bodyParser.json())
app.use(cors())

app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
})


