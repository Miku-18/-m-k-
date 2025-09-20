import fetch from 'node-fetch';
import { igdl } from 'ruhend-scraper';

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `${emoji} Necesitas enviar un enlace de *Facebook* para descargar.`, m, rcanal);
  }

  
  const regexFacebook = /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.watch)\/[^\s]+$/i;
  if (!regexFacebook.test(args[0])) {
    return conn.reply(m.chat, `${emoji} El enlace proporcionado no es válido o no pertenece a *Facebook*`, m, rcanal);
  }

  let res;
  try {
    if (m.react) await m.react('💗');
    res = await igdl(args[0]); 
  } catch (e) {
    return conn.reply(m.chat, `${emoji} Hubo un error al obtener los datos. ¿Seguro que el enlace es válido?`, m, rcanal);
  }

  let result = Array.isArray(res) ? res : res?.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, `${emoji} No se encontró nada... prueba con otro link.`, m, rcanal);
  }

  let data;
  try {
   
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)") || result[0];
  } catch (e) {
    return conn.reply(m.chat, `${emoji} No se pudo procesar el video.`, m, rcanal);
  }

  if (!data?.url) {
    return conn.reply(m.chat, `${emoji} No hay resolución compatible disponible.`, m, rcanal);
  }

  let video = data.url;


  let infoMsg = `
❥ *Resolución:* ${data.resolution || "Sin datos"}
❦ *Origen:* Facebook
✿ *Enlace:* ${args[0]}

`.trim();

  try {
    await conn.sendMessage(m.chat, {
      video: { url: video },
      caption: infoMsg,
      fileName: 'facebook_video.mp4',
      mimetype: 'video/mp4'
    }, { quoted: m });

    if (m.react) await m.react('🪷');
  } catch (e) {
    if (m.react) await m.react('🥀');
    return conn.reply(m.chat, `${emoji} No se pudo obtener el vídeo...`, m, rcanal);
  }
};

handler.help = ['facebook <url>', 'fb <url>'];
handler.tags = ['descargas'];
handler.command = ['facebook', 'fb'];
handler.group = true;

export default handler;