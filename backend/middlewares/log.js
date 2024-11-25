function log(){
    return (req,res,next)=>{
        const method = req.method;
        const route = req.originalUrl;
        
        // Get the current time
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const time = `${hours}:${minutes}`;

        // Log the data
        console.log(`-- ${time} ${method} ${route} --`);

        // Pass control to the next middleware
        next();
    }
}

export {log};