const test=(req,res)=>{
    res.json('test is working')

}
const {comparePassword,hashPassword} =require('../helpers/auth')
const User=require('../models/user')
const jwt=require('jsonwebtoken');
//register endpoint
const registerUser=async(req,res)=>{
    try{

        const {name,email,password}=req.body;
        //check name
        if(!name){
            return res.json({
                error:'name is required'
            })
        };
        //check password
        if(!password || password.length<6){
            return res.json({
                error:'password is required'
            })
        };
        //check mail
        const exist=await User.findOne({email});
        if(exist){
            return res.json({
                error:'email taken is required'
            })
        };
        //create 
        const hashedPassword=await hashPassword(password)
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
        })
        return res.json(user)
    }catch(error){
        console.log(error)

    }

};
//login endpoint
const loginUser =async(req,res)=>{
    try {
        const {email,password}=req.body;
        //check user exists
        const user= await User.findOne({email});
        if(!user){
            return res.json({
                error:'No email found'
            })
        }

        //check passwords match
        const match=await comparePassword(password,user.password)
        if(match)
        {
jwt.sign({email: user.email,id:user._id,name:user.name},process.env.JWT_SECRET,{},(err,token)=>{
    if(err) throw err;
    res.cookie('token',token).json(user)
})        }
        if(!match){
            res.json({
                error:'Wrong password'
            })
        }
    } catch (error) {
        
    }

}
const getProfile=(req,res)=>{

    const {token}=req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    }
}
module.exports={
    test,
    registerUser,
    loginUser,
    getProfile
}