import { Router } from "express";
import threadRouter from './thread.js';
import chatRouter from './chat.js';

const router = Router();
const loggingMiddleware = (request, response, next) =>{
    console.log(`${request.method} - ${request.url}`);
    next();
};
router.use(loggingMiddleware);
router.use('/api/', threadRouter);
router.use('/api/', chatRouter);

export default router;