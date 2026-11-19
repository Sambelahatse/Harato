const router=require('express').Router(),jwt=require('jsonwebtoken')
router.post('/login',(req,res)=>{const password=process.env.ADMIN_PASSWORD;if(!password)return res.json({token:'development-mode',message:'Authentification désactivée.'});if(req.body.password!==password)return res.status(401).json({message:'Mot de passe incorrect.'});const token=jwt.sign({role:'admin'},process.env.JWT_SECRET||'dev-only-secret',{expiresIn:'12h'});res.json({token})})
module.exports=router
