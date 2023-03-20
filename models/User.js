import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = mongoose.Schema({
    firstName:{type: String,},
    lastName: {type: String,},
    address: {type: String,},
    age: {type: Number,},
    phone: {type: String,unique:true},
    username: {type:String,unique:true,},
    email: {type: String, unique:true,},
    pw: {type:String,},
    id: {type: String, unique:true,},
},{collection: 'user-data'})

const User = mongoose.model('User',UserSchema)

export default User