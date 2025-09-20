let handler = async (m, { conn, text, command }) => {
    let id = text ? text : m.chat  
    let chat = global.db.data.chats[m.chat]
    chat.welcome = false

    await conn.reply(id, `🎀💙🌸✨🎀💙🌸✨🎀
*¡Me despido de esta galaxia~!* 🌙💫
Que las notas musicales 🎶 y los sueños ✨ te acompañen 💖
Nos vemos en otra dimensión 🌸💙
🎀💙🌸✨🎀💙🌸✨🎀`) 

    await conn.groupLeave(id)

    try {  
        chat.welcome = true
    } catch (e) {
        await m.reply(`❌ Oops, ocurrió un error inesperado 💦`) 
        return console.log(e)
    }
}

handler.command = ['salir','leavegc','salirdelgrupo','leave']
handler.group = true
handler.owner = true

export default handler