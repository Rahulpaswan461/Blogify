const express = require("express")
const multer = require("multer")
const path = require("node:path")
const Blog = require("../models/blog")
const Comment = require("../models/comment")

const router = express.Router()

const storage = multer.diskStorage({
      destination:function(req,file,cb){
         cb(null,path.resolve(`./public/upload/`))
      }, 
      filename:function(req,file,cb){
         cb(null,`${Date.now()} -${file.originalname}`)
      }
})

const upload = multer({storage})

router.get("/add",(req,res)=>{
    // make sure to pass the user other wise the nav is not display
    return res.render("addBlog",{
        user:req.user,
    })
})

router.get("/:id", async (req,res)=>{
      const blog = await Blog.findById(req.params.id).populate("createdBy");
      const comment = await Comment.find({blogId:req.params.id}).populate("createdBy")
      console.log(blog)
      console.log(comment)
      return res.render("BlogDetails",{
        user:req.user,
        blog,
        comments:comment
      })
})

router.post("/",upload.single("coverImage"), async (req,res)=>{
    const {title,body} = req.body;
    const blog = await Blog.create({
          title,
          body,
          createdBy:req.user._id,
          coverImage:`/upload/${req.file.fileName}`
     })
  
    return res.redirect(`/blog/${blog._id}`)
})

router.post("/comment/:blogId", async (req,res)=>{
    await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

module.exports = router