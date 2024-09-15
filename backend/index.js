let express=require("express")
let mongoose=require("mongoose")
const route = require("./routes/route")
let cors=require("cors")
var bodyParser = require('body-parser');
let app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/fsd4ecom").then(()=>{
    console.log("ok")
})
app.use("/imgs",express.static("./prodimgs"))
app.use("/",route)
app.listen(5000)