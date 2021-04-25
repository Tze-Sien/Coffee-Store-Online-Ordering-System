const { formidable } = require('formidable')
const mongoose = require('mongoose')
const router = require('../routes/users')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Item", ItemSchema)