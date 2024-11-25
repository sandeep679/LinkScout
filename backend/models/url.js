import mongoose from "mongoose";

const urlSchema =new  mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    shortId:{
        type: String,
        required:true,
        unique:true,
    },
    shortenURL :{
        type:String,
        required:true,
    },
    redirectURL :{
        type:String,
        required:true,
    },
    qrImageUrl :{
        type:String,
    },
    totalClicks:{
        type:Number,
        default:0,
    },
    visitHistory :[{
        timestamp :{
            type:Date,
            default: Date.now,
        },
        country: {
                type: String,
                required: true,
        },
    }],
    createdBy :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
},
{timestamps:true}
);


const URL=mongoose.model('url',urlSchema);

export default URL;