import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import path, { join } from 'path';
import ws from 'ws';

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner }) => {
    const isDeleteSession = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
    const isPauseBot = /^(stop|pausarai|pausarbot)$/i.test(command);
    const isListBots = /^(bots|listjadibots|subbots)$/i.test(command);

    async function reportError(e) {
        await m.reply(`💔 Ocurrió un error inesperado, linda.\n🌸 Intenta otra vez ✨`);
        console.log(e);
    }

    switch (true) {
        case isDeleteSession:
            let mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
            let uniqid = `${mentionedJid.split`@`[0]}`;
            const sessionPath = `./${jadi}/${uniqid}`;

            if (!fs.existsSync(sessionPath)) {
                await conn.sendMessage(m.chat, { text: `⚡✨ No tienes una sesión activa, preciosa.\n\n🌸 Para crear una usa:\n${usedPrefix + command}\n\n💖 Si ya tienes una *ID*, escríbela así:\n${usedPrefix + command} \`\`\`(ID)\`\`\`` }, { quoted: m });
                return;
            }

            if (global.conn.user.jid !== conn.user.jid) {
                await conn.sendMessage(m.chat, { text: `💎 Usa este comando en el *Bot Principal, reina* 👑.\n\n[🔗 Bot Principal](https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0)` }, { quoted: m });
                return;
            }

            await conn.sendMessage(m.chat, { text: `😿💔 Tu sesión como *Sub-Bot* fue eliminada, muñeca.` }, { quoted: m });

            try {
                fs.rmdir(`./${jadi}/` + uniqid, { recursive: true, force: true });
                await conn.sendMessage(m.chat, { text: `✅✨ Cerraste sesión y eliminaste todo rastro, hermosa.` }, { quoted: m });
            } catch (e) {
                reportError(e);
            }
            break;

        case isPauseBot:
            if (global.conn.user.jid === conn.user.jid) {
                conn.reply(m.chat, `👑 Si no eres *SubBot*, amor, contacta con el *Bot Principal* para convertirte en uno 💖.`, m);
            } else {
                await conn.reply(m.chat, `🌸✨ quedó en pausa, princesa 👑.`, m);
                conn.ws.close();
            }
            break;

        case isListBots:
            const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];

            function formatUptime(ms) {
                var segundos = Math.floor(ms / 1000);
                var minutos = Math.floor(segundos / 60);
                var horas = Math.floor(minutos / 60);
                var días = Math.floor(horas / 24);
                segundos %= 60;
                minutos %= 60;
                horas %= 24;
                return `${días ? días + "d " : ""}${horas ? horas + "h " : ""}${minutos ? minutos + "m " : ""}${segundos ? segundos + "s" : ""}`;
            }

            const message = users.map((v, index) => 
                `💖 「 ${index + 1} 」\n📎 [Conectar](https://wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}serbot%20--code)\n👩‍💻 Usuario: ${v.user.name || 'Sub-Bot'}\n🕑 Online: ${v.uptime ? formatUptime(Date.now() - v.uptime) : 'Desconocido'}`)
            .join('\n\n🌷───────────────────────🌷\n\n');

            const responseMessage = `💎✨ *LISTA DE SUBBOTS, DULZURA* ✨💎\n\n👑 Puedes pedir permiso para agregar un SubBot a tu grupo 💖.\n\n\`\`\`Si quieres convertirte en un SubBot, da clic en uno de los enlaces activos ✨.\`\`\`\n\n🌸 *SubBots Conectados*: ${users.length || '0'}\n\n${message || '💔 No hay SubBots disponibles ahora, amor. Vuelve más tarde 💕'}`;

            await _envio.sendMessage(m.chat, { text: responseMessage, mentions: _envio.parseMention(responseMessage) }, { quoted: m });
            break;
    }
}

handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesesaion', 'stop', 'pausarai', 'pausarbot', 'bots', 'listjadibots', 'subbots'];
export default handler;