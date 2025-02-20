import { Chat } from "../models/chat.model.js";
import { Router } from "express";


const router = Router();

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