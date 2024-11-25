import User from '../models/user.js';
import {setUser,getUser} from '../service/auth.js'
import bcrypt from 'bcrypt';

const saltRounds = 2;


async function handleSignUp(req,res){
    //console.log(req.body);
    try {
        const {name,email,password}=req.body;

        const Hashedpwd =await bcrypt.hash(password, saltRounds)
        console.log(Hashedpwd);
        

        const user =await User.create({
            name,
            email,
            password:Hashedpwd,
        });

        const jwtToken =setUser(user);
        res.header('token', jwtToken);

        console.log(res.header);

        const response={
            status: true,
            message:"User sucessful",
        }
        const result ={
            user:user,
            response:response,
        }
        
        return res.json(result);
    } catch (error) {
        console.log('here');

        const response={
            status: false,
            message:"User register failed",
        }
        
        return res.json({response});
    }
    
}

async function handleLogin(req,res){
    console.log('here');
    
    const {email,password}=req.body;
        const user =await User.findOne({email});
        //console.log(user);
        
        if(!user){
            
            return res.json({
                response:{
                    status:false,
                    message: "Not Found",
                }
            })
        }

        const hash =user.password;
        const match = await bcrypt.compare(password, hash)

        if(!match){
            
            return res.json({
                response:{
                    status:false,
                    message: "Not Found",
                }
            })
        }


    const jwtToken =setUser(user);
    res.header('token', jwtToken);

    const response={
        status: true,
        message:"User login sucessful",
    }
    const result ={
        user:user,
        response:response,
    }
    //console.log(result);
    
    return res.json(result);
}

async function handleVerify(req,res) {
    let user;
    try{
        const jwtToken = req.headers['authorization'].split(' ')[1];

        user = getUser(jwtToken);
    
    }
    catch(error){
        error.status= false;
        error.verify=false;
        return res.json(error);
    }
    
    return res.json({
        status:true,
        verify:true,
        user:user,
        message:"User is authenticated."

    });
}

async function handleUpdatePassword(req,res) {
    let user;
    try{
        const jwtToken = req.headers['authorization'].split(' ')[1];

        user = getUser(jwtToken);
    
        console.log(user);
    }
    catch(error){
        error.status= false;
        error.verify=false;
        return res.json(error);
    }


    let NewUser;
    try{
        const Hashedpwd =await bcrypt.hash(req.body.password, saltRounds)
        NewUser = await User.findByIdAndUpdate(
            {_id:user.id},
            {   
                password:Hashedpwd
            },
            {new: true}
        );
        return res.json({status:true});
    }
    catch(error){
        error.status=false;
        return res.json(error)
    }

}


export {handleSignUp,handleLogin,handleVerify,handleUpdatePassword};