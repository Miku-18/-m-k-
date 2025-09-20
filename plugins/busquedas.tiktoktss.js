import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `⚠️ Por favor, ingrese lo que desea buscar en TikTok.`, m)

  try {
    await m.react('⏳')
    conn.reply(m.chat, `🔎 Buscando en TikTok, espere un momento...`, m)

    let { data: response } = await axios.get('https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + text)
    let searchResults = response.data

    if (!searchResults || searchResults.length === 0) {
      return conn.reply(m.chat, `❌ No se encontraron resultados para: *${text}*`, m)
    }

    let result = searchResults[Math.floor(Math.random() * searchResults.length)]

    await conn.sendMessage(m.chat, {
      video: { url: result.nowm },
      caption: `🎬 *${result.title || "Video encontrado"}*`
    }, { quoted: m })

    await m.react('✅')

  } catch (error) {
    await conn.reply(m.chat, `❌ Error: ${error.message}`, m)
  }
}

handler.help = ['tiktoksearch <txt>']
handler.tags = ['buscador']
handler.command = ['tiktoksearch', 'ttss', 'tiktoks']
handler.group = true

export default handler