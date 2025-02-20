import { Thread } from "../models/chat.model.js";
import { Router } from "express";

const router = Router();

router.post(`/thread`, async (req, res) =>{
    const thread = req.body;

    if(!thread.name){
        res.status(403).send({msg : "Sorry you need to fill thread name"});
    }

    const newThread = new Thread(thread)

    try{
        await newThread.save();
        res.status(201).send(newThread);
    }catch{
        console.error("Error when save the new thread");
        res.sendStatus(400);
    }
});


router.get(`/threads`, async (req, res) =>{
    try {
        const threads = await Thread.find();
        res.status(200).send(threads);
    } catch (err) {
        console.error("Error when get all threads");
        res.sendStatus(400);
    }
});

router.get(`/thread/:id`, async (req, res) => {
    const { params: { id } } = req;
    console.log(id);
    try {
        const findThread = await Thread.findById(id);
        if (!findThread) {
            return res.status(404).send({ msg: "Thread not found" });
        } else {
            console.log('Thread found:', findThread);
            return res.send(findThread);
        }
    } catch (err) {
        console.error('Error retrieving Thread by ID:', err);
        return res.status(500).send({ msg: "Internal server error" });
    }
});

export default router;