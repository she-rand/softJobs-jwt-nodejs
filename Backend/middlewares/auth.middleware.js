require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware=(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    try {
         jwt.verify(token, process.env.JWT_SECRET);
        const { email,rol } = jwt.decode(token)
        req.user = {email,rol};
        next();
        } 
    catch (error) {
        console.log(error);
        return res.status(error.code||401).send({ error:error|| "Invalid token" });
    }
}
module.exports = { authMiddleware }