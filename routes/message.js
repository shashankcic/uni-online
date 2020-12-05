const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Message = require('../models/Message');
const User = require('../models/User');

router.get('/', auth, async(req, res) => {
    try {
        const messages = await Message.find({
            $or:[ 
                {to: req.user.id}, {from: req.user.id} 
            ] }).populate('from', ['name']).populate('to', ['name']).exec();
        
        var links = [];
        for(var i = 0; i < messages.length; i++){
            if(req.user.id == messages[i].from._id){
                links[i] = {
                    msg: `Messages with ${messages[i].to.name}`,
                    user : messages[i].to._id
                };
            } else {
                links[i] = {
                    msg: `Messages with ${messages[i].from.name}`,
                    user : messages[i].from._id
                };
            }
        }


        return res.json(links);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const messages = await Message.findOne({ $or:[
            { to: req.user.id, from: req.params.id}, 
            { to: req.params.id ,from: req.user.id} 
        ] }).populate('from').populate('to').exec();
        return res.json(messages);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/:id', auth, async (req, res) => {
    try {
        // find user who is sending the message
        const user = await User.findById(req.user.id);
        const { name } = user;

        const { message } = req.body;

        const msg = `${name}: ${message}`

        //when send message check if there are already a connection between the users
        //let msgExist = await Message.findOne({ from: req.user.id, to: req.params.id });
        let msgExist2 = await Message.findOne({ $or:[
            { from: req.params.id, to: req.user.id }, 
            { from: req.user.id, to: req.params.id }
        ] });

        if(msgExist2){
            msgExist2.message.push(msg);

            await msgExist2.save();

            return res.json(msgExist2);
        }
        const newMsg =  new Message({
            from: req.user.id,
            to: req.params.id,
            message: msg
        });

        await newMsg.save();

        return res.json(newMsg);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;