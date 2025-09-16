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

global.mods = ['50488198573']
global.suittag = ['50488198573'] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.nameqr = '𝔸𝕤𝕥𝕣𝕠 𝔹𝕠𝕥'
global.namebot = '𝐀𝐬𝐭𝐫𝐨 𝐁𝐨𝐭'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.astroJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '𝐀𝐬𝐭𝐫𝐨-𝐁𝐨𝐭'
global.botname = '𝑨𝒔𝒕𝒓𝒐 - 𝑩𝒐𝒕'
global.wm = '𝐀𝐬𝐭𝐫𝐨 𝐁𝐨𝐭'
global.author = 'Made By 𝐃𝐞𝐲𝐥𝐢𝐧'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ 𝑫𝒆𝒚𝒍𝒊𝒏'
global.textbot = '𝐀𝐬𝐭𝐫𝐨 - 𝐁𝐨𝐭 • Powered By 𝑫𝒆𝒚𝒍𝒊𝒏'
global.etiqueta = '𝑫𝒆𝒚𝒍𝒊𝒏'

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
