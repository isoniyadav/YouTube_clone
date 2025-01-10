const User=require('../Models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const cookieOptions={
    httpOnly:true,
    secure:false,  //Set to true production
    sameSite:'Lax'
};

exports.signUp=async(req,res)=>{
    try{
        const {channelName,userName,about,profilePic,password}=req.body;
        const isExit=await User.findOne({userName});
    
        if(isExit){
            res.status(400).json({error:"Username already exits"});
        }
        else{
            let updatedPass=await bcrypt.hash(password,10);
            const user=new User({channelName,userName,about,profilePic,password:updatedPass});
            await user.save();
            res.status(201).json({message:"User registered successfully",success:"yes",data:user});
        }
    }catch(error){
        res.status(500).json({error:'Server error'});
    }
}

exports.signIn=async(req,res)=>{
    try{
        
        const { userName,password}=req.body;
        const user=await User.findOne({userName});

        if(user && await bcrypt.compare(password,user.password)){

            const token=jwt.sign({userId:user._id},'Secret_key');
            res.cookie('token',token,cookieOptions);
            res.json({message:"Logged in successfully",success:"true",token,user});
        }
        else{
            res.status(400).json({error:"Invalid Credentials"});
        }
    }
    catch(error){
        res.status(500).json({error:'Server error'});
    }
}

exports.logout=async (req,res)=>{
    res.clearCookie('token',cookieOptions).json({message:"Logged out Successfully"});
}
