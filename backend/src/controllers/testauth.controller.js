
import userModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import config from "../config/config.js"
import cookie from 'cookie-parser'

export const testRegister = async(req, res) => {

    try {
        
        const {userName, email, password } = req.body

    if(!userName || !email || !password){
        return res.status(400).json({
            message:"userName, email and password all are must required"
        })
    }

    const user = await userModel.find({email});
    
    if(!user){
        return res.status(400).json({
            message:"invalid credentials, user already exist"
        })
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const token = jwt.sign(user._id, config.JWT_SECRET, {expiresIn:"7d"})

    res.cookie("token", token ,{
        httpOnly:true,
        secure:true,
        sameSite:"None"
    })    

    await user.create({
        userName,
        email,
        password
    })

    return res.status(201).json({
        message:"user created successfully",
        uesr: user
    })


    } catch (error) {
        
        return res.status(500).json({
            message:"internal server error",
            error: error.message
        })
    }

}

export const testLogin = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"invalid credentials, email and password must required"
        })
    }

    

}