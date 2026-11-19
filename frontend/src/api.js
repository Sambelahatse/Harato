const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/,'')
export function authHeaders(){const token=localStorage.getItem('harato_token');return token?{Authorization:`Bearer ${token}`}:{ }}
export async function api(path, options={}) {
  const res=await fetch(`${API}${path}`,{...options,headers:{'Content-Type':'application/json',...authHeaders(),...(options.headers||{})}})
  const data=await res.json().catch(()=>({message:'Réponse serveur invalide'}))
  if(!res.ok) throw new Error(data.message||`Erreur ${res.status}`)
  return data
}
export {API}
