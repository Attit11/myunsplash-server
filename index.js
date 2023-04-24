const express = require("express")
require("./src/mongoose/db")

const app = express()
const PORT = process.env.PORT || 4000


app.listen(PORT, ()=>{
    console.log(`🚀 Server is running on port ${PORT}`)
})