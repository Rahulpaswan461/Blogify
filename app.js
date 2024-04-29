require("dotenv").config()

const express = require("express")
const path = require("node:path")
const userRoute = require("./routes/user")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const blogRoute = require("./routes/blog")
const { checkForAuthenticationCookie } = require("./middleware/authentication")
const Blog = require("./models/blog")
// "mongodb://127.0.0.1:27017/blogify"

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Mondgo DB is connected "))



const app = express()
const PORT = process.env.PORT ||  1200;

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.get("/",async (req,res)=>{
      const allBlogs = await Blog.find({}).sort("createdAt")
      return res.render("home",{
        user:req.user,
        allBlogs 
      })
})

app.use("/user",userRoute)
app.use("/blog",blogRoute)
app.listen(PORT,()=>{
    console.log("Server is running : ")
})