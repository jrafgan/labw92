const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Category = require('../models/Category');
const Product = require('../models/Product');

router.get('/', async (req, res) => {

    // try { // Здесь код aggreagte который считает количество в каждой категории
    //     const categories = await Category.find();
    //
    //     const productsCount = await Product.aggregate([{$group: {_id: '$category', count: {$sum: 1}}}]);
    //     res.send(productsCount);
    // } catch (e) {
    //     return res.status(400).send(e)
    // }
    if (req.query.id) {
        const id = req.query.id;

        const categories = await Category.find({_id: id});
        if (categories) res.send(categories);
        else res.sendStatus(500);
    } else {

        const categories = await Category.find();
        if (categories) res.send(categories);
        else res.sendStatus(500);
    }

});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const categories = await Category.find({_id: id});
    if (categories) res.send(categories);
    else res.sendStatus(500);
});

router.post('/', auth, async (req, res) => {
    try {
        // console.log(req.body, req.user._id);
        // req.body.user = req.user._id;
        const postData = new Category(req.body);

        await postData.save();
        res.status(200).send(postData);

    } catch (error) {
        return res.status(400).send(error)
    }

});

module.exports = router;