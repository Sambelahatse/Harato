const mongoose=require('mongoose')
const schema=new mongoose.Schema({lohateny:{type:String,required:true,trim:true},andininy:{type:String,required:true,trim:true},sokajy:{type:String,required:true,enum:['Didy Folo','Famonjena','Fampitandremana','Fitiavana','Mpanarato']},votoatiny:{type:String,required:true},daty:{type:Date,default:Date.now}},{timestamps:true})
module.exports=mongoose.models.Hafatra||mongoose.model('Hafatra',schema,'hafatra')
