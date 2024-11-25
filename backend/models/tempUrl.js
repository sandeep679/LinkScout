import mongoose from "mongoose";

const tempSchema =new  mongoose.Schema({
    shortId:{
        type: String,
        required:true,
        unique:true,
    },
    redirectURL :{
        type:String,
        required:true,
    },
    shortenURL :{
        type:String,
        required:true,
    }
},
{timestamps:true}
);


const TempURL=mongoose.model('temp-url',tempSchema);

export default TempURL;