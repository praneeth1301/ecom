const umodel = require("../models/usermodel")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
let adduser=async(req,res)=>{
    try{
        let data = await umodel.findOne({ "_id": req.body._id });
       if(data)
       {
        res.json({"msg":"Given Email already exists"})
       }
       else{
        let hash=await bcrypt.hash(req.body.pwd,10)
        let user=new umodel({...req.body,"pwd":hash})
        await user.save()
        res.json({"msg":"reg done"})
       }


    }
    catch(err)
    {
        console.log(err);
    }
    
}
let login=async(req,res)=>{
    try{
    let data=await umodel.findById({"_id":req.body._id})
    if(data)
    {
        let f=await bcrypt.compare(req.body.pwd,data.pwd)
        if(f)
        {
            res.json({"token":jwt.sign({"_id":data._id},"fsd4"),"_id":data._id,"name":data.name,"role":data.role})
        }
        else{
            res.json({"msg":"Please check your password"})
        }
    }
    else{
        res.json({"msg":"Please check your Email Id"})
    }
    }
    catch(err)
    {
        console.log(err);
    }
}
let islogin=async(req,res,next)=>{
    try{
        
jwt.verify((req.headers.authorization),"fsd4")
next()
    }catch(err){
        console.log(err)
res.json({"msg":"login"})
    }
}
let isadmin=async(req,res,next)=>{
    try{
let x=await umodel.findById({"_id":req.headers.uid})
if(x&&x.role=="admin"){
    next()
}else{
    res.json({"msg":"you are not admin"})
}
    }catch(err){
        
    }
}
module.exports={adduser,login,islogin,isadmin}