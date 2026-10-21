import {readFile} from 'node:fs/promises'
import { lookup } from 'node:dns/promises';
import { writeLog } from './filehandler.js';
const webseiten = JSON.parse(await readFile('./webseiten.json','utf-8'))
const STDPATH = "./log.json"

console.log(process.argv)

    
const arr = []
for(const element of webseiten){
    arr.push(await getStatus(element))
}
writeLog(STDPATH,JSON.stringify(arr,null,2))




async function getIpAddress(url){
    const {address} = await lookup(new URL(url).hostname)   
    return address
}


async function getStatus(element){
        const startTime = Date.now()
        const resp = await fetch(element.url)
        const roundTrip = Date.now() - startTime
        const currentDate = new Date().toLocaleDateString();
        const status = resp.status
        const url = resp.url
        const address = await getIpAddress(element.url)
 
        let siteData = {
            "url": url,
            "ip": address,
            "status": status,
            "date": currentDate,
            "time": roundTrip
        }
        return siteData
}
    