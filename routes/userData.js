import express from 'express'
import {  getUserData,createUserData ,getProfile,logOut} from '../controller/userData.js'

const router = express.Router()

router.post('/login',getUserData)
router.post('/',createUserData)
router.get('/profile',getProfile)
router.post('/logout',logOut)

export default router