const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blog = new Schema({
    blog_name: { type: String, required: true },
    cover_image: { type: String, required: true },
    cover_description: { type: String, required: true },
    blog_link: { type: String, required: true },
    author_name: { type: String, required: true },
    genres: { type: String, required: true },
    likes: { type: Number, default: 0 }
    
}, { timestamps: true }); 

module.exports = mongoose.model('blog', blog);
