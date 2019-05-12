const express = require('express');
const Message = require('../models/Message');
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
        const message = await Message.find({category: id}).populate('user');
        if (message) res.send(message);
        else res.sendStatus(500);
    } else {
        const message = await Message.find().populate('user');

        if (message) res.send(message);
        else res.sendStatus(500);
    }

});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const message = await Message.findOne({_id: id}).populate('user');
    if (message) res.send(message);
    else res.sendStatus(500);
});

router.post('/', auth, async (req, res) => {
    try {

        const messageData = req.body;

        messageData.user = req.user;
        if (req.file) {
            messageData.image = req.file.filename;
        }
        const message = new Message(messageData);
        await message.save();
        res.status(200).send(message);

    } catch (error) {
        return res.status(400).send(error)
    }

});

router.delete('/', auth, async (req, res) => {
    try {
        const message = await Message.findById(req.body.product);
        if (message.user.equals(req.user._id)) {
            message.remove();
            return res.status(200).send('Successfully deleted ' + message);
        } else {
            return res.status(400).send('Not allowed !');
        }

    } catch (error) {
        return res.status(400).send(error)
    }

});


module.exports = router;