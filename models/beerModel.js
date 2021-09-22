const mongoose=require('mongoose')

const beer=mongoose.model('Beer',{
    beerImage:{
        type:String,
        required:true
    },
    beerPrice:{
        type:Number,
        required:true
    },
    beerMl:{
        type:String,
        required:true
    },
    beerName:{
        type:String,
        required:true
    },
    beerType:{
        type:String,
        required:true
    },
})
module.exports=beer