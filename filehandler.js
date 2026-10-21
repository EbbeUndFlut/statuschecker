import {writeFile} from 'node:fs/promises'
// Hier kommen funktionen rein die sich um das schreiben und lesen unsere daten kümmern
// eine funktion zum schreiben unseres logs und eine zum lesen der json
// function bekommt einen pfad und die daten


export async function writeLog(path, data, flag='a'){
    try{
        await writeFile(path, data,{flag})

    }catch(error){
        console.log(error.message)
    }
}