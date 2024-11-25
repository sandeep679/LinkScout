import express from 'express';
import connectDb from './connect.js';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import env from 'dotenv';
import cors from 'cors'

import {verifyLoginUser,checkAuth} from './middlewares/auth.js'
import { log } from './middlewares/log.js';

import urlRouter from './routes/url.js';
import CommonRoute from './routes/common.js'
import UserRoute from './routes/user.js'

env.config()
const port =8000;
const app = express();


connectDb(process.env.DB_URL);

const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    exposedHeaders: ['token'], 
  };


app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()) //for raw/json data
app.use(cookieParser());
app.use(log());



app.use('/url',verifyLoginUser,urlRouter);

app.use('/user',UserRoute);

app.use('/',CommonRoute);

app.get('/',(req,res)=>{
    res.send("Hello from server");
})

app.listen(port ,()=>{
    console.log(`Server is running on port- ${port}`);
})