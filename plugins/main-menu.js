// no tocar 

import { xpRange } from '../lib/levelling.js'

let tags = {
  'anime': 'ANIME',
  'main': 'INFO',
  'search': 'SEARCH',
  'game': 'GAME',
  'serbot': 'SUB BOTS',
  'rpg': 'RPG',
  'sticker': 'STICKER',
  'group': 'GROUPS',
  'nable': 'ON / OFF',
  'premium': 'PREMIUM',
  'downloader': 'DOWNLOAD',
  'tools': 'TOOLS',
  'fun': 'FUN',
  'nsfw': 'NSFW',
  'cmd': 'DATABASE',
  'owner': 'OWNER',
  'audio': 'AUDIOS',
  'advanced': 'ADVANCED',
  'weather': 'WEATHER',
  'news': 'NEWS',
  'finance': 'FINANCE',
  'education': 'EDUCATION',
  'health': 'HEALTH',
  'entertainment': 'ENTERTAINMENT',
  'sports': 'SPORTS',
  'travel': 'TRAVEL',
  'food': 'FOOD',
  'shopping': 'SHOPPING',
  'productivity': 'PRODUCTIVITY',
  'social': 'SOCIAL',
  'security': 'SECURITY',
  'custom': 'CUSTOM'
};
// no tocar 
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let userId = m.sender;
    let botname = conn.user.name || "Kirito-Bot";
    let mode = global.opts["self"] ? "Privado" : "Público";
    let totalCommands = Object.keys(global.plugins).length;
    let totalreg = Object.keys(global.db.data.users).length;
    let uptime = clockString(process.uptime() * 1000);

    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { exp: 0, level: 1 };
    }

    let name = await conn.getName(userId);
    let { exp, level } = global.db.data.users[userId];
    let { min, xp, max } = xpRange(level, global.multiplier);
// no tocar 
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
      help: Array.isArray(plugin.help) ? plugin.help : (plugin.help ? [plugin.help] : []),
      tags: Array.isArray(plugin.tags) ? plugin.tags : (plugin.tags ? [plugin.tags] : []),
      limit: plugin.limit,
      premium: plugin.premium,
    }));

    let menuText = `
╭─────✿♡✿─────╮
│ Hola *@${userId.split('@')[0]}* ❀
│ Soy *${botname}* 🌸
╰─────✿♡✿─────╯

╭─ ❁ Información ❁ ─╮
│ ♡ Cliente: @${userId.split('@')[0]}
│ ♡ Bot: ${(conn.user.jid == global.conn.user.jid ? 'Principal 💖' : 'Sub Bot 💕')}
│ ♡ Modo: ${mode}
│ ♡ Usuarios: ${totalreg}
│ ♡ Activo: ${uptime}
│ ♡ Comandos: ${totalCommands}
╰──────────────────╯

❀ ⋆ Lista de Comandos ⋆ ❀

${Object.keys(tags).map(tag => {
  const commandsForTag = help.filter(menu => menu.tags.includes(tag));
  if (commandsForTag.length === 0) return ''; 
  return `╭─ ❁ ${tags[tag]} ❁ ─╮
${commandsForTag.map(menu => 
  menu.help.map(help => `│ ♡ ${_p}${help} ${menu.limit ? '★' : ''} ${menu.premium ? '👑' : ''}`).join('\n')
).join('\n')}
╰───────────────╯`
}).filter(text => text !== '').join('\n')}
`;

    // no tocar 

    await m.react('💗');
    await conn.sendMessage(m.chat, { 
        image: { url: global.img },
      caption: menuText.trim(), 
      mentions: [m.sender] 
    }, { quoted: m });
  } catch (e) {
    conn.reply(m.chat, '🥀 Lo sentimos, el menú tiene un error.', m);
    throw e;
  }
};

handler.command = ['menu', 'help']
handler.before = async (m, { conn }) => {
    let text = m.text?.toLowerCase()?.trim();
    if (text === 'menu' || text === 'help') {
        return handler(m, { conn });
    }
}

export default handler

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

function getRandomEmoji() {
  const emojis = ['🪷', '🥀', '💗', '💔'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function getLevelProgress(exp, min, max, length = 10) {
  if (exp < min) exp = min;
  if (exp > max) exp = max;
  let progress = Math.floor(((exp - min) / (max - min)) * length);
  progress = Math.max(0, Math.min(progress, length)); 
  let bar = '█'.repeat(progress) + '░'.repeat(length - progress);
  return `[${bar}]`;
}