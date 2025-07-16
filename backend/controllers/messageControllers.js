import asyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';


const sendMessage = asyncHandler(async(req, res) => {
    const{content, chatId} = req.body;

    if(!content || !chatId){
        console.log('invalid data passed into request');
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        var message = await Message.create(newMessage);
        message = await message.populate('sender','name pic').execPopulate();
        message = await message.populate('chat').execPopulate();
    } catch (error) {
        
    }
})

export default sendMessage;