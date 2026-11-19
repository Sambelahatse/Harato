const fs=require('fs/promises'),path=require('path')
const dir=path.join(__dirname,'..','.data')
const file=collection=>path.join(dir,`${collection}.json`)
async function ensure(){await fs.mkdir(dir,{recursive:true})}
async function list(collection){await ensure();try{return JSON.parse(await fs.readFile(file(collection),'utf8'))}catch{return []}}
async function put(collection,doc){const rows=await list(collection);const i=rows.findIndex(x=>x.id===doc.id);if(i<0)rows.unshift(doc);else rows[i]=doc;await fs.writeFile(file(collection),JSON.stringify(rows,null,2));return doc}
async function remove(collection,id){const rows=await list(collection),next=rows.filter(x=>x.id!==id);await fs.writeFile(file(collection),JSON.stringify(next,null,2));return rows.length!==next.length}
async function get(collection,id){return (await list(collection)).find(x=>x.id===id)||null}
module.exports={list,put,remove,get}
