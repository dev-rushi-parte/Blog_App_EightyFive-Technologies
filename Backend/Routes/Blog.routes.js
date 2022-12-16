const BlogRoutes = require("express").Router();

const BlogModel = require("../Model/Blog.model")
const userModel = require("../Model/User.model");

// API for creating the Blog

BlogRoutes.post("/", async (req, res) => {

    const { title, content, img, userId } = req.body;


    const user = await userModel.findOne({ _id: userId })
    console.log(user)
    const new_blog = new BlogModel({

        title,
        author_name: user.name,
        content,
        img,
        userId
    })
    await new_blog.save()
    res.status(201).send({ "message": "Blog created" })
})

// API for getting all Blog

BlogRoutes.get("/all", async (req, res) => {

    const Blogs = await BlogModel.find();

    res.status(200).send(Blogs)
})


// API for getting user Blogs only

BlogRoutes.get("/", async (req, res) => {

    const { userId } = req.body


    const userBlog = await BlogModel.find({ userId })

    res.status(200).send(userBlog)
})


// API for deleting the Blog  only user can delete there blog

BlogRoutes.delete("/:blogId", async (req, res) => {

    const { blogId } = req.params;
    const { userId } = req.body;
    const blog = await BlogModel.findOne({ _id: blogId });

    if (blog.userId === userId) {
        await BlogModel.findOneAndDelete({ _id: blogId })
        return res.send({ "message": "successfull deletes" })

    }
    else {
        return res.status(401).send("youare not authrised to delete the blog")
    }
})


// API for edit the blog only user can edit there blog

BlogRoutes.patch("/:blogId", async (req, res) => {

    const { blogId } = req.params;
    const { userId } = req.body;
    const blog = await BlogModel.findOne({ _id: blogId })
    // console.log(blog)
    if (blog !== null) {
        if (blog.userId === userId) {

            const new_blog = await BlogModel.findOneAndUpdate({ _id: blogId }, req.body, { new: true })
            return res.status(200).send({ "message": "successfully updated", new_blog })
        }
        else {
            return res.status(401).send("you are not authorised to do it")
        }
    }
    else {
        res.status(404).send("blog not found")
    }
})

module.exports = BlogRoutes;