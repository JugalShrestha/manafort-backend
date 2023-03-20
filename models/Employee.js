import mongoose ,{Schema} from "mongoose";

const dataSchema = mongoose.Schema({
    name: {type:String},
    salary: {type: Number},
    address: {type: String,},
    joinedOn: {type: Date},
    age: {type: Number,},
    phone: {type: String,unique:true},
    email: {type: String, unique:true,},
    photo: {type: String,},
    userAdmin:{type: String,},
},{collection: "employee-data"})

const Employee = mongoose.model('Data',dataSchema)
export default Employee