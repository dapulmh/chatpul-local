import mongoose from "mongoose";


const responseSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
}, {
    timestamps:true
});

const chatSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['text', 'image'],
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    response: {
        type: responseSchema, 
        required: true
    }
}, {
    timestamps:true
});

const threadSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    chats: [chatSchema]
}, {
    timestamps: true
})

const Thread = mongoose.model('Thread', threadSchema);
const Chat = mongoose.model('Chat', chatSchema);
const Response = mongoose.model('Response', responseSchema);
export {Thread, Chat, Response}