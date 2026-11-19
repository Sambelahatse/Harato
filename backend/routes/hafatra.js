const router=require('express').Router(),auth=require('../middleware/auth'),store=require('../lib/store')
const Hafatra=require('../models/Hafatra')
const valid=['Didy Folo','Famonjena','Fampitandremana','Fitiavana','Mpanarato']
const mongo=()=>require('mongoose').connection.readyState===1
const clean=d=>({lohateny:String(d.lohateny||'').trim(),andininy:String(d.andininy||'').trim(),sokajy:d.sokajy,votoatiny:String(d.votoatiny||'').trim(),daty:d.daty||new Date().toISOString()})
router.get('/',async(req,res)=>{try{res.json(mongo()?await Hafatra.find().sort({daty:-1}).lean():await store.list('hafatra'))}catch(e){res.status(500).json({message:e.message})}})
router.get('/:id',async(req,res)=>{try{const d=mongo()?await Hafatra.findById(req.params.id).lean():await store.get('hafatra',req.params.id);if(!d)return res.status(404).json({message:'Fampianarana tsy hita.'});res.json(d)}catch(e){res.status(400).json({message:'ID tsy mety.'})}})
router.post('/',auth,async(req,res)=>{try{const d=clean(req.body);if(!d.lohateny||!d.andininy||!d.votoatiny||!valid.includes(d.sokajy))return res.status(400).json({message:'Fenoy tsara ny saha rehetra.'});const created=mongo()?await Hafatra.create(d):await store.put('hafatra',{...d,id:Date.now().toString()});res.status(201).json(created)}catch(e){res.status(500).json({message:e.message})}})
router.put('/:id',auth,async(req,res)=>{try{const d=clean(req.body);if(!d.lohateny||!d.andininy||!d.votoatiny||!valid.includes(d.sokajy))return res.status(400).json({message:'Fenoy tsara ny saha rehetra.'});const updated=mongo()?await Hafatra.findByIdAndUpdate(req.params.id,d,{new:true,runValidators:true}):await store.put('hafatra',{...d,id:req.params.id});if(!updated)return res.status(404).json({message:'Fampianarana tsy hita.'});res.json(updated)}catch(e){res.status(400).json({message:e.message})}})
router.delete('/:id',auth,async(req,res)=>{try{const ok=mongo()?Boolean(await Hafatra.findByIdAndDelete(req.params.id)):await store.remove('hafatra',req.params.id);if(!ok)return res.status(404).json({message:'Fampianarana tsy hita.'});res.json({success:true})}catch(e){res.status(400).json({message:e.message})}})
module.exports=router
