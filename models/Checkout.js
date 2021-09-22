const mongoose=require('mongoose')
const cart=require('./cartModel')
const checkout=mongoose.model('Checkout',{
    ailaId:{
        type:String,
        ref:aila
    } ,  
    userId:
    {type:String},

    ailaQty:{
        type:Number,
    },
    ailaPrice:{
        type:Number
    }
})
module.exports=cart