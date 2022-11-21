const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please, provide name value']
    },
    price:{
        type: Number,
        required: [true, 'Please, provide price value']
    },
    image:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', ProductSchema)