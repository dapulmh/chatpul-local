import { Chat } from "../models/chat.model.js";
import { Router } from "express";
import ollama from 'ollama';


const router = Router();

router.post(`/chat`, async (req, res) => {
    const prompt = req.body;

    if (!prompt) {
        return res.status(400).send({ msg: 'Prompt is required' });
    }

    try {
        const response = await ollama.chat({
          model: 'puliolio',
          messages: [{ role: 'user', content: prompt.content }],
        });
    
        res.json({ reply: response.message.content });
      } catch (error) {
        res.status(500).send({ error: `Error :  ${error.message}` });
      }
});


router.get(`/chats`, async (req, res) =>{
    try {
        const chats = await Chat.find();
        res.status(200).send(chats);
    } catch (err) {
        console.error("Error when get all threads");
        res.sendStatus(400);
    }
});

router.get(`/chat/:id`, async (req, res) => {
    const { params: { id } } = req;
    console.log(id);
    try {
        const findChat = await Chat.findById(id);
        if (!findChat) {
            return res.status(404).send({ msg: "Chat not found" });
        } else {
            console.log('Thread found:', findChat);
            return res.send(findChat);
        }
    } catch (err) {
        console.error('Error retrieving Thread by ID:', err);
        return res.status(500).send({ msg: "Internal server error" });
    }
});


export default router;