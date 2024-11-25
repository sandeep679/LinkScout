import { nanoid } from "nanoid";
import URL from '../models/url.js';
import qrCodeGenerater from "../service/qrGeneration.js";


async function handleNewShortUrl(req,res){

    console.log(req.body);
    console.log(req.headers.referer);
    
    const body=req.body;
    if(!body.url) return res.status(400).json({error: "url is required"});

    const shortid = nanoid(5);

    const shortenURL = req.headers.referer + 'redirect/' + shortid;

    const urllink = await qrCodeGenerater(shortenURL);
    let  qrUrl;
    if(urllink.status){
        qrUrl = urllink.qrUrl;
    }
    console.log(req.user);
    

    const url = await URL.create({
        shortId : shortid,
        name:body.name,
        shortenURL:shortenURL,
        redirectURL :body.url,
        qrImageUrl:qrUrl,
        visitHistory:[],
        createdBy:req.user.id,

    });

    return res.json(url);

    
}

async function handleShortUrl(req,res){
    //console.log(req.route.path);

    const shortid = req.params.shortid;
    const userIP = req.headers['x-forwarded-for'];

    //for location also check geoip-lite package

    //console.log(req.headers['x-forwarded-for']);
    

    // const countryByIP =await axios.get(`http://ip-api.com/json/${userIP}`)
    // console.log(countryByIP.data);
    const country="India";

    const entry = await URL.findOneAndUpdate(
        {shortId:shortid},
        {   
            $inc: { totalClicks: 1 },
            $push:{
                visitHistory: {
                    timestamp:new Date(),
                    country
                }
            },
        }
    );
    // console.log(entry.redirectURL)

    //return res.json({redirectURL : entry.redirectURL})

    res.redirect(entry.redirectURL);

}

// async function handleShortUrl(req,res){
//     const shortid = req.params.shortid;
//     const entry = await URL.findOne({shortId: shortid});
//     console.log(entry);

//     const url = await Click.create({
//         urlId: entry._id
//     });

//     return res.send("Redirected ")

// }

async function handleGetAnalytics(req,res){
    const shortId= req.params.shortid;
    const data =await URL.findOne({shortId});
    // console.log(data);


    res.json(data);
}

// async function handleGetAnalytics(req,res){
//     const shortid= req.params.shortid;
//     const url = await URL.findOne({shortId: shortid});
//     const urlId=url._id;
//     const clicksPerDay = await Click.aggregate([
//         { 
//             $match: { urlId: urlId } 
//         },
//         {
//             $group: {
//                 _id: { 
//                     $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
//                 },
//                 count: { $sum: 1 }
//             }
//         },
//         {
//             $sort: { "_id": 1 } // Sort by date
//         }
//     ]);
    
//     console.log(clicksPerDay);

//     return res.json(clicksPerDay);
// }


async function handleGetUserLinks(req,res) {
    
    const data = await URL.find({createdBy: req.user.id});
    

    return res.json(data);
}

async function handleUpdate(req,res) {
    console.log(req.body);
    
    const {id,name,url} = req.body;

    try{
        const entry = await URL.findByIdAndUpdate(
            {_id:id},
            {   
                name:name,
                redirectURL:url,
            },
            {new: true}
        );
        entry.status=true;
        return res.json(entry);
    }
    catch(error){
        error.status=false;
        return res.json(error)
    }
    
}
async function handleDelete(req,res) {
    console.log(req.params);
    
    const {id}=req.params;
    try {
        await URL.findByIdAndDelete(id);
        return res.json({success:true});
    } catch (error) {
        error.success=false;
        return res.json(error);
    }
    
    
}




export {handleNewShortUrl,handleShortUrl,handleGetAnalytics,handleGetUserLinks,handleUpdate,handleDelete};