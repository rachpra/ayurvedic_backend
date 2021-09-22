const express=require('express')
const router=express.Router()
const favorite=require('../models/favoriteModel')
const authenticate=require('../middleware/authenticate')   
const imageUpload=require('../middleware/imageUpload')

router.post('/add/favorite',imageUpload.single('ailaImage'),function(req,res){
    console.log(req.file)
    if(req.file == undefined){
        return res.status(400).json({message : "Only image files are allowed."})
    }
    const ailaName=req.body.ailaName
    const ailaType=req.body.ailaType
    const ailaPrice=req.body.ailaPrice
    const ailaMl=req.body.ailaMl
  

    const ailaData=new favorite({
        ailaImage:req.file.path,
        ailaPrice:ailaPrice,
        ailaMl:ailaMl,
        ailaName:ailaName,
        ailaType:ailaType})
    
    ailaData.save().then(function(result){
        res.status(201).json({message:"Aila added to favorite."})
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })

})

router.delete('/favorite/delete/:ailaId',function(req,res){
    const pid=req.params.ailaId
    favorite.deleteOne({_id:pid})
    .then(function(result){
        res.status(200).json({message:"Aila deleted successfully",status:"true"})
    })
    .catch(function(err){
        res.status(500).json({message:err,status:"false"})
    })
})

//Fetch all data from db
router.get('/favorite/all',function(req,res){
    favorite.find().then(function(info){
        
        res.status(200).json({
           
            data:info
        })
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})
module.exports=router