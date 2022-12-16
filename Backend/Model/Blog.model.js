const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({

    title: { type: String, required: true },
    content: { type: String, required: true },
    author_name: { type: String },
    img: { type: String },
    userId: { type: String }

}, {
    timestamps: true
})

const BlogModel = mongoose.model("blogs", blogSchema)


module.exports = BlogModel