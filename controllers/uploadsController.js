const path = require('path')
const fs = require('fs')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors/index')
const cloudinary = require('cloudinary').v2

const uploadProductImageLocal = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError("No file uploaded")
    }
    const productImage = req.files.image
    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError("Please, upload image")
    }
    const imageMaxSize = 1024 * 1024
    if (productImage.size > imageMaxSize) {
        throw new CustomError.BadRequestError("Please, upload image less than 1KB")
    }
    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)
    await productImage.mv(imagePath)


    return res.status(StatusCodes.OK).json({
        image: {
            src: `/uploads/${productImage.name}`
        }
    })
}

const uploadProductImage = async (req, res) => {
    console.log(req.files.image)
    const result = await cloudinary
        .uploader
        .upload(req.files.image.tempFilePath, {
            use_filename: true,
            folder: 'file-upload'
        })
    fs.unlinkSync(req.files.image.tempFilePath)
    return res.status(StatusCodes.OK).json({image:{src: result.secure_url}})
}


module.exports = {uploadProductImage}