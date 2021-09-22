const express=require('express')
const router=express.Router()
const beer=require('../models/beerModel')
const authenticate=require('../middleware/authenticate')   //providing path for authenticate.js
const imageUpload=require('../middleware/imageUpload')

//for inserting liquor items
router.post('/beer/insert',imageUpload.single('beerImage'),function(req,res){
    // console.log(req.file)
    if(req.file == undefined){
        return res.status(400).json({message : "Only image files are allowed."})
    }
    const beerName=req.body.beerName
    const beerType=req.body.beerType
    const beerPrice=req.body.beerPrice
    const beerMl=req.body.beerMl
    // const ailaImage=req.body.productImage

    const beerData=new beer({
        beerImage:req.file.path,
        ailaPrice:beerPrice,
        ailaMl:ailaMl,
        ailaName:ailaName,
        ailaType:ailaType})
    
    ailaData.save().then(function(result){
        res.status(201).json({message:"Aila Added Successfully."})
    })
    .catch(function(e){
        res.status(500).json({message:e})
    })

})

router.put('/aila/update/:id',authenticate.checkUser,authenticate.checkAdmin,function(req,res){
    const id=req.params.id
    const ailaImage=req.body.ailaImage
    const ailaPrice=req.body.ailaPrice
    const ailaMl=req.body.ailaMl
    const ailaName=req.body.ailaName
    const ailaType=req.body.ailaType

    aila.updateOne({_id:id},{ailaName:ailaName,ailaType:ailaType,ailaPrice:ailaPrice,ailaMl:ailaMl,ailaImage:ailaImage})
    .then(function(result){
        res.status(200).json({message:"Aila updated successfully!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
})

router.delete('/aila/delete/:ailaId',function(req,res){
    const pid=req.params.ailaId
    aila.deleteOne({_id:pid})
    .then(function(result){
        res.status(200).json({message:"Aila deleted successfully",status:"true"})
    })
    .catch(function(err){
        res.status(500).json({message:err,status:"false"})
    })
})

//Fetch all data from db
router.get('/aila/all',function(req,res){
    aila.find().then(function(info){
        res.status(200).json({

            data:info
        })
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})

router.get('/aila/one/:id',function(req,res){
    const id=req.params.id
    aila.findOne({_id:id})
    .then(function(info){
        res.status(200).json(info)
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})

module.exports=router