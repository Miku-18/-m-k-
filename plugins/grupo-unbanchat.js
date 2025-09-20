let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return conn.reply(m.chat, '*ԋσʅα, ɳσ ҽɳƈσɳƚɾσ ҽʂƚҽ ƈԋαƚ ҽɳ ɱι Ⴆαʂҽ ԃҽ ԃαƚσʂ.*', m, fake)
let chat = global.db.data.chats[m.chat]
if (!chat.isBanned) return conn.reply(m.chat, `*¡𝚂𝚒𝚐𝚘 𝚊𝚌𝚝𝚒𝚟𝚊 𝚎𝚗 𝚎𝚜𝚝𝚎 𝚌𝚑𝚊𝚝!*`, m, fake)
chat.isBanned = false
await conn.reply(m.chat, '🪷 *¡𝚄𝚏𝚏, 𝚢𝚊 𝚖𝚎 𝚎𝚜𝚝𝚊𝚋𝚊 𝚊𝚋𝚞𝚛𝚛𝚒𝚎𝚗𝚍𝚘... 𝙷𝚘𝚕𝚊 𝚍𝚎 𝚗𝚞𝚎𝚟𝚘!*', m, fake)
}
handler.help = ['unbanchat']
handler.tags = ['grupo']
handler.command = ['unbanchat','desbanearchat','desbanchat']
handler.admin = true 
handler.botAdmin = true
handler.group = true

export default handler