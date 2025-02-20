import mongoose from "mongoose";
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

router.post(`/image`, async (req, res) =>{
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


export default router;