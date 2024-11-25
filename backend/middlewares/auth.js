import { getUser } from "../service/auth.js";

// async function verifyLoginUser(req,res,next){
//     const userid= req.cookies.uid;

//     if(!userid) return res.redirect('/login');
//     const user =getUser(userid);
    
//     if(!user) return res.redirect('/login');

//     req.user=user;
//     next();
    
// }

async function verifyLoginUser(req,res,next){

    let user;
    if(!req.headers['authorization'])
        return res.json({
        success:false,
        message:"Access Denied. No token provided."
    })
    

    try{
        const jwtToken = req.headers['authorization'].split(' ')[1];

        user = getUser(jwtToken);
    
        //console.log(user);
    }
    catch(error){
        error.status= false;
        error.verify=false;
        return res.json(error);
    }

    req.user=user;
    next();
}

async function checkAuth(req,res,next){
    const userid= req.cookies.uid;

    
    const user =getUser(userid);
    

    req.user=user;
    next();
}

export  {verifyLoginUser,checkAuth};