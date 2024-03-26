const bcrypt= require ('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel=require('../models/user.model.js')
const  { getDatabaseError }  = require('../lib/errors/database.errors.js');


const register = async(req, res)=>{
    const { email, password,rol,lenguage } = req.body;
    try{
             await userModel.create({
                email,
                password: bcrypt.hashSync(password, 10),
                rol,
                lenguage
            });
        return res.status(201).json({ message: "User created successfully"});
    }
    catch(error){

        console.log(error);
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        } 
        return res.status(500).json({ message: "Internal server error" });

    }
}
const login = async(req,res)=>{
    const { email, password } = req.body;
    
    try {
        const user = await userModel.findEmail(email);
        
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const payload = {
        email,
        user_rol: user.rol,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return res.status(200).json({ message: "User logged successfully",token,email });
        
    } catch (error) {
        console.log(error);
        return res.status(error.code||500).json({ message:error.message|| "Internal server error" });
    }

}
const readByUser=async(req,res)=>{
    const { email } = req.user;
    try {
        const user = await userModel.findEmail(email);
        return res.status(200).json({ user });

    } catch (error) {
        console.log(error);
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        } 
        return res.status(500).json({ message: "Internal server error" });
    
    }
}


module.exports = { register,login,readByUser }