let mongoose=require("mongoose")
let usersch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String,
    "phno":String,
    "place":String,
    "role":{
        type:String,
        default:"user"
    }

})
let umodel=mongoose.model("user",usersch)
module.exports=umodel