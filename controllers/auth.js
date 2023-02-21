const User=require("../models/user");
const jwt=require("jsonwebtoken");
const {hashPassword,comparePassword}=require("../helpers/auth");

//register
const registerUser=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name.trim()){
            return res.json({error:"Name is required"});
        }
        if(!email){
            return res.json({error:"Email is required"});
        }
        if(!password){
            return res.json({error:"Password is required"});
        }
        //Check if email is taken
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.json({error:"Email is taken"})
        }

        //hash password
        const hashedPassword=await hashPassword(password);
        //create user
        const user=await new User({
            name,
            email,
            password:hashedPassword
        }).save();

        //create signed token
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        //send response
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address:user.address
            },
            token
        })
    }catch (error){
        console.log(error);
    }
}
module.exports={registerUser};