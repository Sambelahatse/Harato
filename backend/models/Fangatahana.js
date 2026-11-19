const mongoose=require('mongoose')
const schema=new mongoose.Schema({anarana:{type:String,required:true,trim:true},mailaka:{type:String,default:'',trim:true},fangatahana:{type:String,required:true,trim:true},status:{type:String,default:'Vaovao'}},{timestamps:true})
module.exports=mongoose.models.Fangatahana||mongoose.model('Fangatahana',schema,'fangatahana')
