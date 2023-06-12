const Message = require('../models/message.model');
const ObjectId = require('mongoose').Types.ObjectId;

async function insertMessage(text, sender, sessionID) {
    const id = new ObjectId(sessionID);
    const newMessage = new Message({ text:text, sender:sender, sessionID:id });
    try {
        await newMessage.save();
        return newMessage;
    } catch (err) {
        console.log(err.message);
        return null;
    }
}

async function deleteAllMessages() {
    try {
        await Message.deleteMany({});
        console.log(`${result.deletedCount} documents deleted.`);
    } catch (err) {
        console.log(err.message);
    }
}

async function getMessages() {
    try {
        const messages = await Message.find().select({ _id: 0, __v: 0 });
        return messages;
    } catch (err) {
        console.log(err.message);
        return null;
    }
}

async function getMessagesBySessionID(sessionID) {
    try {
        const allMessages = await getMessages();
        const messages = allMessages.filter(message => message.sessionID === sessionID);
        return messages;
    } catch (err) {
        console.log(err.message);
        return null;
    }
}


module.exports = {
    insertMessage,
    deleteAllMessages,
    getMessages,
    getMessagesBySessionID
}