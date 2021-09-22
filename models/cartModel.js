const mongoose=require('mongoose')
const aila=require('./ailaModel')
const cart=mongoose.model('Cart',{
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