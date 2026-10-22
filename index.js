import {readFile} from 'node:fs/promises'
import { lookup } from 'node:dns/promises';
import { readLog, writeLog } from './filehandler.js';

const webseiten = JSON.parse(await readFile('./webseiten.json','utf-8'))
const STDPATH = "./log.json"

try{
if (process.argv.length == 2){
    checkStatus()
}else{
    const customArguments = extractArguments()

    if(customArguments['--add']){
        const newEntry = newUrlEntry(customArguments['--add'])
        checkForDuplicates(newEntry)
        webseiten.push({url:newEntry})
        writeLog('./webseiten.json',JSON.stringify(webseiten,null,2),'w')
    }else if(customArguments.error){
        const data = JSON.parse(await readLog(STDPATH))
        const badEntries = data.filter((ele) => ele.status > 299)
        console.log(badEntries)
    }
    else{
        throw new Error("Argument nicht unterstützt")
    }
}
}catch(error){
    console.error(error.message)
}

function checkForDuplicates(newEntry){
    const dup = webseiten.filter((ele) => ele.url === newEntry)
    if (dup.length != 0)
        throw new Error('URL already in List')
}
function newUrlEntry(url){
    try{
        const newUrl =  new URL(url)
        return newUrl.origin
    }catch(error){
        throw error
    }
}
function extractArguments(){
    const arg = process.argv.slice(2)
    const argumentsObject = {}
    for (const argument of arg){
        if(!argument.includes("="))
            argumentsObject[argument] = true
        else{
            const arr = argument.split('=')
            argumentsObject[arr[0]] = arr[1]
        }
    }
    return argumentsObject
}

async function checkStatus(){


const arr = []
for(const element of webseiten){
    const logData = await getStatus(element)
    if(logData)
        arr.push(logData)
}
console.log(arr)
let oldData = await readLog(STDPATH)
if(oldData){
    oldData = JSON.parse(oldData)
    oldData.push(...arr)
}
writeLog(STDPATH,JSON.stringify(oldData?oldData:arr,null,2),'w')
}



async function getIpAddress(url){
    const {address} = await lookup(new URL(url).hostname)   
    return address
}


async function getStatus(element){
    try{
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
    }catch(error){
        console.log(error.message)
    }
}
    