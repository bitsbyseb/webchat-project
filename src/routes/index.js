import express from "express";
import {join} from 'node:path';
import {isLogged,isRegistered} from "../middlewares/isLogged.js";

const router = express.Router();
const views = join(import.meta.dirname,'../views');

router.get('/',isLogged,(req,res) => {
    res.sendFile(join(views,'index.html'));
});

router.get('/register',isRegistered,(req,res)=> {
    res.sendFile(join(views,'register.html'));
});

export default router;