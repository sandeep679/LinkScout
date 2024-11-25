import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

const secret=process.env.SECRET;

function setUser(user){
    return jwt.sign({
        id:user._id,
        name:user.name,
        email:user.email,
        password:user.password,
    },secret);
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secret);
}

export {setUser,getUser};