import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import registerRoutes from './routes/userData.js'
import employeeRoutes from './routes/empData.js'
import fileDirName from './file-dir-name.js';

const { __dirname, __filename } = fileDirName(import.meta);
import * as dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
const CORS_ORIGIN = process.env.CORS_ORIGIN

const app = express()
app.use(cors({credentials:true,origin:CORS_ORIGIN}))
app.use(express.json())
app.use(cookieParser())
app.use('/photos',express.static(__dirname + '/photos'))
app.use(bodyParser.json({limit:'30mb',extended: true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended: true}))

const CONNECTION_URL = process.env.ATLAS_URI
const PORT = process.env.PORT

app.get('/',(req,res)=>{
    res.send("App is running!")
})

app.use('/register',registerRoutes)
app.use('/emp',employeeRoutes)

mongoose.connect(CONNECTION_URL)
.then(()=>{app.listen(PORT,()=>{console.log("Server running : ",PORT);})})
.catch((err)=>{console.log("Error: ",err);})
