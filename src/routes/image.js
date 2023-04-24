const express = require("express")
const auth = require("../middleware/auth")
const upload = require("../middleware/upload")
const Image = require("../model/image")

const router = new express.Router()

//upload image
router.post("/image", auth, upload.single("image"), async(req, res)=>{
    try {
      
        const image = new Image({
          label: req.body.label, image: req.file.buffer, owner: req.user._id
        });
        await image.save();
        res.send({ message: "Image is uploaded", id: image._id });
      } catch (e) {
        console.log("❌ There is an error ", e)
        res.status(400).send({ error: e.message });
      }
})

//get images
router.get("/image", auth, async(req, res)=>{
    try {
        const images = await Image.find({owner: req.user._id})
        if(!images){
            res.status(404).send({message: "❌ No images found"})
        }
        res.send(images)
    } catch (error) {
        console.log("❌ There is an error ", e)
        res.status(400).send({ error: e.message });
    }
})

//get one task
router.get("/image/:id", auth, async(req, res)=>{
    try {
        const images = await Image.findOne({_id: req.params.id, owner: req.user._id})
        if(!images){
            res.status(404).send({message: "❌ No images found"})
        }
        res.send(images)
    } catch (error) {
        console.log("❌ There is an error ", e)
        res.status(400).send({ error: e.message });
    }
})

//delete task
router.delete("/image/:id", auth, async(req, res)=>{
    try {
        const image = Image.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!image){
            res.status(404).send({message: "❌ No images found"})
        }
        res.send({message: "✅ Image deleted successfully!"})
    } catch (error) {
        console.log("❌ There is an error ", e)
        res.status(400).send({ error: e.message });
    }
})

//update image
// router.patch("/image/:id", auth, async(req, res)=>{

//     try {
//         const updates = Object.keys(req.body)
//         console.log("UPDATES", req.file)
//         const allowedUpdates = ["label","image"]
//         const isValid = updates.every(update=> allowedUpdates.includes(update))
//         if(!isValid){
//             throw new Error({message: "❌ Invalid Updates!"})
//         }const image = await Image.findOne({
//             _id: req.params.id,
//             owner: req.user._id,
//           });
//         updates.forEeach(update=> image[update]= req.body[update])
//         await image.save()
//         res.send({message: "✅ Updates Successfully", task})
//     } catch (e) {
//         console.log("❌ There is an error ", e)
//         res.status(400).send({ error: e.message });
//     }
// })

module.exports = router