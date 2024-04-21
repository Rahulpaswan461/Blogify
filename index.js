const express = require("express")
const path = require("node:path")
const userRoute = require("./routes/user")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const blogRoute = require("./routes/blog")
const { checkForAuthenticationCookie } = require("./middleware/authentication")
const Blog = require("./models/blog")

mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then(()=>console.log("Mondgo DB is connected "))


const app = express()
const PORT = 8000

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