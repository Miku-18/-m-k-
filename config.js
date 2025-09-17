import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
  ['']
]; // <-- si quiere agregar más hágalo así ['numero'] si agrega más pongo una ","
//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = ['']
global.suittag = [''] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.nameqr = '꧁★mіkᥙ★꧂'
global.namebot = '꧁★mіkᥙ★꧂'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.Jadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = 'ミ୧❀һᥲ𝗍sᥙᥒᥱ mіkᥙ❀୨彡'
global.botname = 'ミ୧❀һᥲ𝗍sᥙᥒᥱ mіkᥙ❀୨彡'
global.wm = '꧁★mіkᥙ★꧂'
global.author = 'Made By ꧁★mіkᥙ★꧂'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ ミ୧❀һᥲ𝗍sᥙᥒᥱ mіkᥙ❀୨彡'
global.textbot = 'ミ୧❀һᥲ𝗍sᥙᥒᥱ mіkᥙ❀୨彡 • Powered By ꧁★mіkᥙ★꧂'
global.etiqueta = '꧁★mіkᥙ★꧂'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.moneda = 'llamas'
global.banner = 'https://tinyurl.com/25md9gsv'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
