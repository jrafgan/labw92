const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    const user = new User(req.body);

    user.generateToken();
    console.log('this is user', user);

    try {
        await user.save();
        return res.send({message: 'User registered ', user});
    } catch (error) {
        return res.status(400).send(error)
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'User does not exist'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Password incorrect'});
    }

    user.generateToken();

    await user.save();

    res.send({message: 'Login successful ', user});
});


router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Logged out'};
    if (!token) {
        return res.send(success);
    }
    const user = await User.findOne({token});
    if (!user) {
        return res.send(success)
    }
    user.generateToken();
    await user.save();
    return res.send(success);
});

router.put('/', auth, async (req, res) => {


    req.user.password = req.body.password;

    await req.user.save();

    res.sendStatus(200);
});

module.exports = router;
