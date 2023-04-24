const express = require("express")
require("./src/mongoose/db")
const cors = require("cors")
const userRouter = require("./src/routes/user")

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(userRouter)

app.listen(PORT, ()=>{
    console.log(`🚀 Server is running on port ${PORT}`)
})