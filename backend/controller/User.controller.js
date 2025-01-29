const { User } = require('../models/index');
const bcrypt=require("bcrypt")
const  jwt=require("jsonwebtoken");

module.exports={
    addUser:async (req,res)=> {
        const{fullName,email,password}=req.body
    if(!fullName || !email || !password){
        return res
        .status(400)
        .json({error:true ,message:"allfields are required"})

    }
    const isUser= await User.findOne({ where: { email: email } });
    console.log('userrrrrrrrrrrrrrrrrrrrrrrrrrrrr',isUser);
    
    if (isUser){
        return res
        .status(400)
        .json({error:true,message:"user already exists"})
        
    }
    
    const hashPassword= await bcrypt.hash(password,10)
    const user= new User({
        fullName,
        email,
        password:hashPassword
    })
    await user.save()
    const accessToken=jwt.sign({
        userId:user.id
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn :"72h"
    })

return res.status(201).json({
    error:false,
    user:{
        fullName:user.fullName,email:user.email
    },
    accessToken,
    message:"registration successful"
})

    },
    Login:async (req,res)=>{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({message:'email and password are required'})
        }
        const user=await User.findOne({where: { email: email } })
        if(!user){
            return res.status(400).json({message:'user not found'})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({message:"invalid pass"})
        }
        const accessToken=jwt.sign({
            userId:user.id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'72h'
        }
    )
    return res.json({
        error:false,
        message:"login sucessful",
        user :{fullName:user.fullName,email:user.email},
        accessToken,
    })
    },
    getUser:async(req,res)=>{
        const {userId}=req.user 
    const isUser=await User.findOne({where:{id:userId}})

    if(!isUser){
        return res.sendStatus(401)
    }
    return res.json({
        user:isUser,
        message:"",
    })
    
    
    },
  
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            await user.destroy();
            return res.status(204).send(); 
        } catch (error) {
            return res.status(500).json({ message: "Error deleting user" });
        }
    },
    getUsersAndSellers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ['fullName', 'email', 'role'], // Fetching only required fields
                where: {
                    role: ['user', 'seller'] // Filtering for users and sellers
                }
            });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching users and sellers" });
        }
    }
}