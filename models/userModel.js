const mongoose=require('mongoose')

const user=mongoose.model('User',{
    firstName:{
        type:String,
        required:[true,'Enter your first name.'] 
    },
    lastName:{
        type:String,
        required:[true,'Enter your last name.'] 
      
    },

    dob:{
        type:String,
        // required:true,
        
     },
    username:{
        type:String,
        unique:true,
        required:[true,'Enter your username.'],
        trim:true
        
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Please enter valid email.'],
        lowercase:true,
        uppercase:true
        
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        enum:['Admin','Customer'],
        default:'Customer'
    },
    userImage:{type:String,default:"images\\161857611628420210416_181334.jpg"}
    
})

module.exports=user