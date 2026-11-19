require('dotenv').config()
const express=require('express'),cors=require('cors'),mongoose=require('mongoose')
const app=express(),PORT=process.env.PORT||5000
const origins=(process.env.CLIENT_ORIGIN||'http://localhost:5173').split(',').map(x=>x.trim())
app.use(cors({origin:(origin,cb)=>{if(!origin||origins.includes('*')||origins.includes(origin))return cb(null,true);return cb(new Error('Origin non autorisée par CORS'))}}))
app.use(express.json({limit:'1mb'}))
app.get('/health',(req,res)=>res.json({status:'ok',service:'HARATO API',database:mongoose.connection.readyState===1?'mongodb':'json-fallback'}))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/hafatra',require('./routes/hafatra'))
app.use('/api/fangatahana',require('./routes/fangatahana'))
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:'Erreur serveur.'})})
async function seed(){const Hafatra=require('./models/Hafatra'),store=require('./lib/store');const rows=[['Aza manana andriamani-kafa','Eksodosy 20:3','Didy Folo','Aza manana andriamani-kafa afa-tsy Izaho.'],['Aza manao sarin-javatra','Eksodosy 20:4-6','Didy Folo','Aza manao sarin-javatra voasokitra ho anao.'],['Izaho no lalana','Jaona 14:6','Famonjena','Izaho no lalana sy fahamarinana ary fiainana.'],['Vokatry ny fanompoan-tsampy','Deoteronomia 5:9-10','Fampitandremana','Manompoa an’Andriamanitra irery ihany.'],['Mpanarato olona','Lioka 5:10b','Mpanarato','Hatramin’izao ankehitriny izao dia olona kosa no ho azonao.'],['Fitiavan’Andriamanitra','Jaona 3:16','Fitiavana','Fa toy izao no nitiavan’Andriamanitra izao tontolo izao.']].map((x,i)=>({lohateny:x[0],andininy:x[1],sokajy:x[2],votoatiny:x[3],daty:new Date(Date.now()-i*86400000).toISOString()}));if(mongoose.connection.readyState===1){if(await Hafatra.countDocuments()===0)await Hafatra.insertMany(rows)}else{const existing=await store.list('hafatra');if(!existing.length)for(let i=0;i<rows.length;i++)await store.put('hafatra',{...rows[i],id:String(i+1)})}}
async function start(){if(process.env.MONGODB_URI){try{await mongoose.connect(process.env.MONGODB_URI);console.log('MongoDB connected')}catch(e){console.error('MongoDB connection failed; using JSON fallback:',e.message)}}await seed();app.listen(PORT,'0.0.0.0',()=>console.log(`HARATO API running on ${PORT}`))}
start()
