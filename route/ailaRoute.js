const express=require('express')
const router=express.Router()
const aila=require('../models/ailaModel')
const authenticate=require('../middleware/authenticate')   //providing path for authenticate.js
const imageUpload=require('../middleware/imageUpload')
const { count } = require('../models/ailaModel')

//for inserting liquor items
router.post('/aila/insert',imageUpload.single('ailaImage'),function(req,res){
    console.log(req.file)
    if(req.file == undefined){
        return res.status(400).json({message : "Only image files are allowed."})
    }
    const ailaName=req.body.ailaName
    const ailaType=req.body.ailaType
    const ailaPrice=req.body.ailaPrice
    const ailaMl=req.body.ailaMl
    // const ailaImage=req.body.productImage

    const ailaData=new aila({
        ailaImage:req.file.path,
        ailaPrice:ailaPrice,
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

router.put('/aila/update',function(req,res){
    const id=req.body.id
    // const ailaImage=req.body.ailaImage
    const ailaPrice=req.body.ailaPrice
    const ailaMl=req.body.ailaMl
    const ailaName=req.body.ailaName
    const ailaType=req.body.ailaType

    aila.updateOne({_id:id},{ailaName:ailaName,ailaType:ailaType,ailaPrice:ailaPrice,ailaMl:ailaMl})
    .then(function(result){
        res.status(200).json({message:"Aila updated successfully!"})
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
})

router.put('/aila/updateImage/:id', imageUpload.single('ailaImage'), function (req, res) {
    const id = req.params.id
    const ailaImage = req.file.path;
    aila.updateOne({ _id: id }, {
        ailaImage: ailaImage
    }).then(function (result) {
        res.status(200).json({ staus: "true", message: "Image updated" })
    })
        .catch(function (e) {
            res.status(500).json(e)
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

router.get('/aila/all:ailaType',function(req,res){
    const ailaType=req.params.ailaType
    aila.find({ailaType:ailaType}).then(function(info){
        
        res.status(200).json({
           
            data:info
        })
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})

router.get('/aila/type/:ailaType',function(req,res){
    const ailaType=req.params.ailaType
    aila.find({ailaType:ailaType}).then(function(info){
        
        res.status(200).json({
           
            data:info
        })
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})
router.get('/beer',function(req,res){
    aila.find({ailaType:"Beer"}).limit(4).then(function(info){
        res.status(200).json({   
            data:info
        })
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})

router.get('/beer/all',function(req,res){
    aila.find({ailaType:"Beer"}).then(function(info){
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