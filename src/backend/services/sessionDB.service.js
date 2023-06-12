const Session = require('../models/session.model');
const mongoose = require('mongoose');

async function insertSession(name) {
    const newSession = new Session({ name });
    try {
        await newSession.save();
        return newSession;
    } catch (err) {
        throw err;
    }
}

async function deleteAllSessions() {
    try {
        await Session.deleteMany({});
        console.log(`${result.deletedCount} documents deleted.`);
    } catch (err) {
        throw err;
    }
}

async function getAllSessions() {
    try {
        const sessions = await Session.find().select();
        return sessions;
    } catch (err) {
        throw err;
    }
}

async function updateSession(sessionID, name) {
    try {
        const id = new mongoose.Types.ObjectId(sessionID);
        const session = await Session.updateOne({"_id": id}, {$set: {"name": name}});
    } catch (err) {
        throw err;
    }
}

async function getLastSession() {
    try {
        const session = await Session.find().sort({_id:-1}).limit(1);
        return session;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    insertSession,
    deleteAllSessions,
    getAllSessions,
    updateSession,
    getLastSession
}