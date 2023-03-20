import Employee from "../models/Employee.js"
import fs from 'fs'

export const addData = async (req,res) =>{

    try {
        const {originalname, path} = req.file
        const parts = originalname.split('.')
        const type = parts[parts.length-1]
        const newPath = path+'.'+type
        fs.renameSync(path,newPath)
        const {name,email,phone,age,salary,address,joinedOn,photo,userAdmin} = req.body
        const newData = await Employee.create({name,email,phone,age,salary,address,joinedOn,photo:newPath,userAdmin})
        if(newData){
            res.status(200).json({status:'ok'})
        } 
        else{
            res.status(400).json({message:"not Added"})
        }
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const getData = async (req,res) =>{
    try {
        const {username} = req.params
        const allData = await Employee.find({'userAdmin':username}).sort("name")
        if(allData)
        {
            res.status(200).json(allData)
        }
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const displayData = async (req,res)=>{
    try {
     
    const {id} = req.params
    const data = await Employee.findById(id)
    res.status(200).json(data)   
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteData = async (req,res)=>{
    try {
        const {id} = req.params
        const data = await Employee.findByIdAndDelete(id)
        res.status(200).json({message:'deleted'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const editData = async (req,res)=>{
    try {
        const {id} = req.params
        let newPath = null
        if(req.file)
        {
            const {originalname, path} = req.file
            const parts = originalname.split('.')
            const type = parts[parts.length-1]
            newPath = path+'.'+type
            fs.renameSync(path,newPath)
        }
        const {name,email,phone,age,salary,address,joinedOn,photo} = req.body
        const data = await Employee.findById(id)
        await data.updateOne({name,email,phone,age,salary,address,joinedOn,photo:newPath?newPath:data.photo})
        res.status(200).json({message:'edited'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}