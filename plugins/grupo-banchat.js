let handler = async (m) => {

global.db.data.chats[m.chat].isBanned = true
conn.reply(m.chat, `✿ Ⴆσƚ ԃҽʂαƈƚιʋαԃσ.`, m, fake)

}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat$/i
handler.prems = true 

export default handler