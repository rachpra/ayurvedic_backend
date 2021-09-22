const express=require('express')
const router=express.Router()
const aila=require('../models/ailaModel')
const cart=require('../models/cartModel')
const auth=require('../middleware/authenticate')
const imageUpload=require('../middleware/imageUpload')


router.post('/add/cart',imageUpload.single('ailaImage'),function(req,res){
  
    if(req.file == undefined){
        return res.status(400).json({message : "Only image files are allowed."})
    }
    const ailaName=req.body.ailaName
    // const ailaType=req.body.ailaType
    const ailaPrice=req.body.ailaPrice
    const ailaMl=req.body.ailaMl
    const ailaQty=req.body.ailaQty

    
    const cartData=new cart({
        ailaImage:req.file.path,
        ailaPrice:ailaPrice,
        ailaMl:ailaMl,
        ailaName:ailaName,
        // ailaType:ailaType,
        ailaQty:ailaQty})
    
    cartData.save().then(function(result){
        res.status(201).json({success:true,message:"Added to Cart Successfully."})
    })
    .catch(function(e){
        res.status(500).json({message:e})
        console.log(e)
    })
    
})


router.post('/add/cart2/:id',auth.checkUser,auth.checkCustomer,function(req,res){
    const id=req.params.id
//    const ailaId=req.params.ailaId
   const userId=req.data._id
    const ailaQty=req.body.ailaQty
    aila.findOne({_id:id})
    .then(function(data){
        const price=data.ailaPrice*ailaQty
        
        const cartData=new cart({
            ailaId:id,userId:userId,ailaQty:ailaQty
           })
           cartData.save().then(function(result){
            res.status(201).json({success:true,message:"Added to Cart Successfully."})
        })
        
        
    })
    .catch(function(e){
        res.status(500).json({message:e})
        console.log(e)
    })

    
    
})
router.get('/cart/all',auth.checkUser,auth.checkCustomer,function(req,res){
    cart.find({"userId":req.data._id}).populate({"path":"ailaId"}).then(function(info){
        // var parse=JSON.parse(JSON.stringify(info))

        // console.log(parse)

        info.forEach(element => {
           const data=element.ailaId.ailaName
           
        });
        res.status(200).json({
            data:info
           
        }) 
       
    }).catch(function(err){
        res.status(500).json({error:err})
        console.log(err)
    })
})
    

router.get('/cart/one/:id',function(req,res){
    const id=req.params.id
    cart.findOne({_id:id})
    .then(function(info){
        res.status(200).json(info)
    }).catch(function(err){
        res.status(500).json({error:err})
    })
})
router.delete('/cart/delete/:id',function(req,res){
    const id=req.params.id
    cart.deleteOne({_id:id})
    .then(function(result){
        res.status(200).json({success:true,message:"Deleted"})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})

router.put('/cart/update/:id',function(req,res){
    const id=req.params.id
    const ailaQty=req.body.ailaQty
    const ailaPrice=req.body.ailaPrice
    cart.updateOne({_id:id},{
        $set:{
            ailaQty:ailaQty,
            ailaPrice:ailaPrice
        }
    })
    .then(function(result){
        res.status(200).json({success:true,message:"Updated"})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})

module.exports=router
