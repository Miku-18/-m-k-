import { igdl } from 'ruhend-scraper';

const handler = async (m, { args, conn }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `${emoji} Por favor, ingresa un enlace de Instagram.`, m, rcanal);
  }

  const regexInstagram = /^(https?:\/\/)?(www\.)?(instagram\.com|instagr\.am)\/[^\s]+$/i;
  if (!regexInstagram.test(args[0])) {
    return conn.reply(m.chat, `${emoji} El enlace proporcionado no es válido o no pertenece a *Instagram* `, m, rcanal);
  }

  try {

    await m.react(🪷);

    const res = await igdl(args[0]);
    const data = res.data;

    for (let media of data) {
      await conn.sendFile(m.chat, media.url, 'instagram.mp4', `*\`✰ Descarga completa..\`*`, fkontak);
      await m.react(done);
    }

  } catch (e) {
    await m.react(error);
    return conn.reply(m.chat, `${msm} Ocurrió un error al procesar el enlace.`, m);
  }
};

handler.command = ['instagram', 'ig'];
handler.tags = ['descargas'];
handler.help = ['instagram <url>', 'ig <url>'];
handler.group = true;
handler.register = true;
handler.coin = 2;

export default handler;