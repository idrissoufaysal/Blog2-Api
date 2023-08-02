const router=require('express').Router();
const bcrypt=require('bcryptjs')

const User=require('../models/Users');

//Rgister
router.post('/register',async(req,res)=>{
    try {
        const salt= await bcrypt.genSalt(10);
        const hashPass= await bcrypt.hash(req.body.password,salt);

        const newUSer= new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPass
        })
        const user= await newUSer.save();
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e)
    }
})
//Login
router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({username:req.boby.username})
        //!user && res.status(400).json('wong username !!!!!!!!')
        if (!user) {
            res.send("username ou password incorrect")
        }
        else{
        const validate= await bcrypt.compare(req.body.password,user.password)
        !validate && res.status(400).json('Wrong password')

        res.status(200).json(user)
        }
    } catch (e) {
        res.status(500).json(e)
        
    }
})

module.exports=router;