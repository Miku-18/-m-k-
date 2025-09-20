const handler = async (m, { isOwner, isAdmin, conn, args, participants, usedPrefix }) => {
    if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        return;
    }

    const mensaje = args.join` `;
    const info = mensaje ? `💌 *Mensaje:* ${mensaje}` : "✨ *Invocación general*";

    let texto = `
╭─❀🌸❀─╮
    💖 *LLAMADA A TODOS LOS MIEMBROS* 💖
╰─❀🌸❀─╯

${info}

🌷 Total de miembros: ${participants.length}

`;

    for (const miembro of participants) {
        const number = miembro.id.split('@')[0];
        texto += `💖 @${number}\n`;
    }

    texto += `\n💞 *Con amor, tu bot favorito* 💞
✨`;

    conn.sendMessage(m.chat, { text: texto, mentions: participants.map(p => p.id) }, { quoted: m });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['grupo'];
handler.command = ['tagall', 'todos'];
handler.group = true;

export default handler;