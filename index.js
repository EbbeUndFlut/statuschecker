import {readFile} from 'node:fs/promises'
import { lookup } from 'node:dns/promises';
const webseiten = JSON.parse(await readFile('./webseiten.json','utf-8'))

webseiten.forEach(async (element) => {
    console.log(element.url)
    const startTime = Date.now()
    const resp = await fetch(element.url)
    const roundTrip = Date.now() - startTime
    const status = resp.status
    const url = resp.url
    const heute = new Date().toLocaleString()
    console.log(element.url)
    console.log(new URL(element.url).hostname)
    const lu = await lookup(new URL(element.url).hostname)
    console.log(lu)
    // also besorgt mir das datum bitte
    // console.log(status,address,url,heute, roundTrip + 'ms')
});

