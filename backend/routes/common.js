import express from "express";
import {handleNewShortUrl,handleShortUrl} from "../controllers/common.js";

const router=express.Router();

router.get('/start',(req,res)=>{
    return res.json({status:true})
})

router.post('/temp',handleNewShortUrl);

router.get('/redirect/:shortid',handleShortUrl);


export default router;