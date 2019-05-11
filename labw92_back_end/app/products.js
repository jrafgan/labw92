const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {

    if (req.query.category) {
        const id = req.query.category;
        const product = await Product.find({category: id}).populate('user').sort({datetime: -1});
        if (product) res.send(product);
        else res.sendStatus(500);
    } else {
        const products = await Product.find().populate('user').populate('category').sort({datetime: -1});

        if (products) res.send(products);
        else res.sendStatus(500);
    }

});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({_id: id}).populate('user').populate('category');
    if (product) res.send(product);
    else res.sendStatus(500);
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    try {

        const productData = req.body;

        productData.user = req.user;
        if (req.file) {
            productData.image = req.file.filename;
        }
        const product = new Product(productData);
        await product.save();
        const products = await Product.find().populate('user').sort({datetime: -1});
        res.status(200).send(products);

    } catch (error) {
        return res.status(400).send(error)
    }

});

router.delete('/', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.body.product);
        if (product.user.equals(req.user._id)) {
            product.remove();
            return res.status(200).send('Successfully deleted ' + product);
        } else {
            return res.status(400).send('Not allowed !');
        }

    } catch (error) {
        return res.status(400).send(error)
    }

});


module.exports = router;