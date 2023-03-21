import User from "../models/User.js";
import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'

import * as dotenv from 'dotenv'
dotenv.config()


// const salt = bcrypt.genSaltSync(10)

export const createUserData= async (req,res)=>{
    const {firstName,lastName,username,email,phone,age,address,id,pw} = req.body 
    try{
        const newUser = await User.create({
            // pw:bcrypt.hashSync(pw,salt),
            pw,
            firstName,
            lastName,
            username,
            email,
            phone,
            age,
            address,
            id})
            if(newUser)
            {
                res.status(200).json(newUser)
                console.log(res.json(newUser));
            }
            else{
                res.status(400).json({message:"not created"})
            }
    }
    catch(err)
    {
        res.status(400).json({message:err.message})
    }
}

const SECRET = process.env.SECRET_KEY

export const getUserData = async (req,res) =>{

    try {
        const {name,pw} = req.body 
        const userUsernameFound = await User.findOne({username: name})
        const userEmailFound = await User.findOne({email: name})
        const userPhoneFound = await User.findOne({phone: name}) 

        //If username is entered
        if(userUsernameFound)
        {
            // const passwordOk = bcrypt.compareSync(pw,userUsernameFound.pw)
            
            if(pw==userUsernameFound.pw)
            {
                passwordIsOk(userUsernameFound)
            }
            else{
                return res.status(400).json()
            }
        }
        //If phone is entered
        else if(userPhoneFound)
        {
            // const passwordOk = bcrypt.compareSync(pw,userPhoneFound.pw)
            
            if(pw==userPhoneFound.pw)
            {
                passwordIsOk(userPhoneFound)
            }
            else{
                return res.status(400).json()
            }
        }
        //If email is entered
        else if(userEmailFound)
        {
            // const passwordOk = bcrypt.compareSync(pw,userEmailFound.pw)
            
            if(pw==userEmailFound.pw)
            {
                passwordIsOk(userEmailFound)
            }
            
            else{
                return res.status(400).json()
            }
        }
        else{
            return res.status(400).json()
        }

        //If password is correct
        function passwordIsOk(name)
        {
            try {
                const token = jwt.sign({email:name.email,username:name.username},SECRET,(err,token)=>{
                    if(err) {throw err}
                    res.cookie('token',token,{sameSite:'none',secure:true})
                    res.status(200).json('ok')
                })
            } catch (error) {
                res.status(401).json({error:error})
            }
        }
    } 
    catch (error) {
        res.json({status:'error',message:error.message})
    }
}

export const getProfile = (req,res) =>{
    const {token} = req.cookies
    try {
        jwt.verify(token,SECRET,(err,info)=>{
            if(err) {
                res.status(400).json({error:err.message})
            }
            else{
                res.status(200).json(info)
            }
        })
    } catch (error) {
        res.status(400).json({status:"error:"+error.message}) 
    }
}

export const logOut = (req,res) =>{
    res.clearCookie('token',{sameSite:'none',secure:true})
    res.status(200).json('Logged out successfully');
}
