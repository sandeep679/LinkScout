import express from "express";
import {handleNewShortUrl,handleShortUrl,handleGetAnalytics,handleGetUserLinks,handleUpdate, handleDelete} from "../controllers/url.js";

const router=express.Router();

router.post('/',handleNewShortUrl);

router.get('/user-links',handleGetUserLinks);

router.post('/update',handleUpdate);

router.get('/delete/:id',handleDelete);

router.get('/analytics/:shortid',handleGetAnalytics);

router.get('/:shortid',handleShortUrl);





export default router;