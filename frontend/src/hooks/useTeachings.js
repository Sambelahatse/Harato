import {useEffect,useState} from 'react'
import {api} from '../api'
const seed=[
{id:'seed-1',lohateny:'Aza manana andriamani-kafa',andininy:'Eksodosy 20:3',sokajy:'Didy Folo',votoatiny:'Aza manana andriamani-kafa afa-tsy Izaho. Andriamanitra tokana ihany no tokony ivavahana sy hajaina.',daty:'2026-11-18'},
{id:'seed-2',lohateny:'Aza manao sarin-javatra',andininy:'Eksodosy 20:4-6',sokajy:'Didy Folo',votoatiny:'Aza manao sarin-javatra voasokitra ho anao, na ny mety ho endri-javatra. Andriamanitra irery ihany no ivavahana.',daty:'2026-11-16'},
{id:'seed-3',lohateny:'Izaho no lalana',andininy:'Jaona 14:6',sokajy:'Famonjena',votoatiny:'Izaho no lalana sy fahamarinana ary fiainana; tsy misy mankany amin’ny Ray, afa-tsy amin’ny alalako.',daty:'2026-11-13'},
{id:'seed-4',lohateny:'Vokatry ny fanompoan-tsampy',andininy:'Deoteronomia 5:9-10',sokajy:'Fampitandremana',votoatiny:'Mampahatsiahy ny maha-zava-dehibe ny fanompoana an’Andriamanitra irery ihany.',daty:'2026-11-11'},
{id:'seed-5',lohateny:'Mpanarato olona',andininy:'Lioka 5:10b',sokajy:'Mpanarato',votoatiny:'Hatramin’izao ankehitriny izao dia olona kosa no ho azonao. Antso masina ho an’ny mpanarato fanahy rehetra.',daty:'2026-11-09'},
{id:'seed-6',lohateny:'Fitiavan’Andriamanitra',andininy:'Jaona 3:16',sokajy:'Fitiavana',votoatiny:'Fa toy izao no nitiavan’Andriamanitra izao tontolo izao: nomeny ny Zanani-lahy Tokana, mba tsy ho very izay rehetra mino Azy.',daty:'2026-11-08'}]
export default function useTeachings(){
 const [teachings,setTeachings]=useState(()=>{try{return JSON.parse(localStorage.getItem('harato_cache')||'null')||seed}catch{return seed}})
 const [loading,setLoading]=useState(true),[error,setError]=useState('')
 const refresh=async()=>{try{const data=await api('/hafatra');setTeachings(data);localStorage.setItem('harato_cache',JSON.stringify(data));setError('')}catch(e){setError('Mode hors ligne : les données locales sont affichées.')}finally{setLoading(false)}}
 useEffect(()=>{refresh()},[])
 return {teachings,setTeachings,loading,error,refresh}
}
