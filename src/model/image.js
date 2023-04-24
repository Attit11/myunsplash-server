const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    label:{
        type: String,
        required: true,
        trim: true
    },
    image:{
        type: Buffer,
        required: true
    },
    owner:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    }
})


const Image = mongoose.model("Image", imageSchema)
module.exports = Image