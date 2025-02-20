import { Thread, Chat, Response } from "../models/chat.model.js";

export const resolveIndexByThreadId = (request,response, next)=>{
    const {params: {id}} = request;

    const findThreadIndex = Thread.findIndex((thread) => thread.id  === id);

    if (findThreadIndex === -1) return response.sendStatus(404);

    request.findThreadIndex = findThreadIndex;
    next();
};


export const resolveIndexByChatId = (request,response, next)=>{
    const {params: {id}} = request;
    const parsedId = parseInt(id);

    if(isNaN(parsedId)) return response.sendStatus(400);

    const findChatIndex = Chat.findIndex((chat) => chat.id  === parsedId);

    if (findChatIndex === -1) return response.sendStatus(404);

    request.findChatIndex = findChatIndex;
    next();
};


export const resolveIndexByResponseId = (request,response, next)=>{
    const {params: {id}} = request;
    const parsedId = parseInt(id);

    if(isNaN(parsedId)) return response.sendStatus(400);

    const findResponseIndex = Response.findIndex((res) => res.id  === parsedId);

    if (findResponseIndex === -1) return response.sendStatus(404);

    request.findResponseIndex = findResponseIndex;
    next();
};