let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return
  const fkontak = { 
    "key": { 
      "participants": "0@s.whatsapp.net", 
      "remoteJid": "status@broadcast", 
      "fromMe": false, 
      "id": "Halo" 
    }, 
    "message": { 
      "contactMessage": { 
        "vcard": `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:y
item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}
item1.X-ABLabel:Ponsel
END:VCARD` 
      }
    }, 
    "participant": "0@s.whatsapp.net"
  }
  let chat = global.db.data.chats[m.chat]
  let usuario = `@${m.sender.split`@`[0]}`
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'

  let nombre = `
╭─✧⋱ Nombre Modificado ⋰✧─╮
│ ✧ ${usuario} ha cambiado el nombre del grupo
│ ✧ Nuevo nombre:
│   » ${m.messageStubParameters[0]}
╰──────────────────╯`

  let foto = `
╭─✧⋱ Imagen Cambiada ⋰✧─╮
│ ✧ ${usuario} ha actualizado la foto del grupo
│ ✧ ¡Nuevo estilo aplicado!
╰──────────────────╯`

  let edit = `
╭─✧⋱ Configuración Editada ⋰✧─╮
│ ✧ ${usuario} ha modificado los ajustes
│ ✧ Estado: ${m.messageStubParameters[0] == 'on' ? 'Solo admins' : 'Todos'}
╰──────────────────╯`

  let newlink = `
╭─✧⋱ Link Reiniciado ⋰✧─╮
│ ✧ Portal reiniciado por:
│   » ${usuario}
╰──────────────────╯`

  let status = `
╭─✧⋱ Estado del Grupo ⋰✧─╮
│ ✧ ${usuario} ha ${m.messageStubParameters[0] == 'on' ? 'cerrado 🔒' : 'abierto 🔓'} el grupo
│ ✧ Configuración: ${m.messageStubParameters[0] == 'on' ? 'Solo admins' : 'Todos'}
╰──────────────────╯`

  let admingp = `
╭─✧⋱ Admin Ascendido ⋰✧─╮
│ ✧ ${m.messageStubParameters[0].split`@`[0]} ahora es admin
│ ✧ Acción realizada por: ${usuario}
╰──────────────────╯`

  let noadmingp = `
╭─✧⋱ Admin Removido ⋰✧─╮
│ ✧ ${m.messageStubParameters[0].split`@`[0]} ya no es admin
│ ✧ Acción realizada por: ${usuario}
╰──────────────────╯`

  if (chat.detect && m.messageStubType == 21) {
    await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })
  } else if (chat.detect && m.messageStubType == 22) {
    await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })
  } else if (chat.detect && m.messageStubType == 23) {
    await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })
  } else if (chat.detect && m.messageStubType == 25) {
    await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })
  } else if (chat.detect && m.messageStubType == 26) {
    await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })
  } else if (chat.detect && m.messageStubType == 29) {
    await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak })
    return;
  } if (chat.detect && m.messageStubType == 30) {
    await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak })
  }
}