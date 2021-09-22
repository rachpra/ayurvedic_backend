const mongoose=require('mongoose')

const aila=mongoose.model('Aila',{
    ailaImage:{
        type:String,
    },
    ailaPrice:{
        type:Number,
        required:true
    },
    ailaMl:{
        type:Number,
        required:true
    },
    ailaName:{
        type:String,
        required:true
    },
    ailaType:{
        type:String,
        required:true
    },
})
module.exports=aila