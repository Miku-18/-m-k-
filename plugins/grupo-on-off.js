let handler = async (m, { conn, args, usedPrefix, command }) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => icono) 

    let isClose = { 
        'open': 'not_announcement',
        'close': 'announcement',
        'abierto': 'not_announcement',
        'cerrado': 'announcement',
        'on': 'not_announcement',
        'off': 'announcement',
    }[(args[0] || '')]

    if (isClose === undefined)
        return conn.reply(m.chat, `
╭─♡✦ Grupo Mágico ✦♡─╮
│ ¡Hola! Debes elegir una opción
│ para configurar el grupo:
│
│ ✧ #${command} on
│ ✧ #${command} off
│ ✧ #${command} open
│ ✧ #${command} close
╰──────────────────╯
        `.trim(), m)

    await conn.groupSettingUpdate(m.chat, isClose)

    if (isClose === 'not_announcement'){
        m.reply(`
╭─♡✦ Grupo Abierto ✦♡─╮
│ Ahora todos los miembros
│ pueden escribir libremente.
╰──────────────────╯
        `.trim())
    }

    if (isClose === 'announcement'){
        m.reply(`
╭─♡✦ Solo Admins ✦♡─╮
│ Solo los administradores
│ pueden enviar mensajes ahora.
╰──────────────────╯
        `.trim())
    }
}

handler.help = ['group open / close', 'grupo on / off']
handler.tags = ['grupo']
handler.command = ['group', 'grupo']
handler.admin = true
handler.botAdmin = true

export default handler