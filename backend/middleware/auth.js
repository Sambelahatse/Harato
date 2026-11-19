const jwt=require('jsonwebtoken')
module.exports=function auth(req,res,next){if(!process.env.ADMIN_PASSWORD)return next();const header=req.headers.authorization||'';const token=header.startsWith('Bearer ')?header.slice(7):'';try{jwt.verify(token,process.env.JWT_SECRET||'dev-only-secret');next()}catch{return res.status(401).json({message:'Connexion admin requise.'})}}
