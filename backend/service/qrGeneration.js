import cloudinary from "./cloudinary_config.js";
import QRCode from 'qrcode';


async function qrCodeGenerater(link) {
    let qrUrl;
    try{
        const qrCodeDataURL = await QRCode.toDataURL(link,{
            width: 1000, // Set width
            height: 1000 // Set height
        });
        const uploadResponse = await cloudinary.uploader.upload(qrCodeDataURL, {
            folder: 'qr_codes',
            resource_type: 'image',
        });

        qrUrl = uploadResponse.secure_url;
    }
    catch(error){
        const result ={
            status:false,
            message:"Error occured during Qr Code generation and its URL."
        }
        return result;
    }

    const result ={
        status:true,
        qrUrl:qrUrl
    };

    return result;
     
}


export default qrCodeGenerater;