import {addData,getData,displayData,deleteData,editData} from '../controller/empData.js'
import express from 'express'
import multer from "multer"
const photo = multer({dest:'photos/'}) 

const router = express.Router()

router.post('/add',photo.single('photo'),addData)
router.post('/get/:username',getData)
router.get('/:id',displayData)
router.post('/:id/del',deleteData)
router.put('/:id/edit',photo.single('photo'),editData)
export default router