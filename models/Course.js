const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number
})

const Course = mongoose.model('course',courseSchema)

module.exports = Course