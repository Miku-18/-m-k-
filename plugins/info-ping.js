import speed from 'performance-now'
import { exec } from 'child_process'

let handler = async (m, { conn, usedPrefix, text }) => {
    let timestamp = speed();
    let latensi = speed() - timestamp;

    exec(`neofetch --stdout`, (error, stdout, stderr) => {
        let child = stdout.toString("utf-8");

        conn.reply(m.chat, `*💖¡Pong, preciosa!💖*\n> ╭─────────ஐღஐ─────────╮\n> │ ✨ *Tiempo:* ${latensi.toFixed(4)} ms ✨\n> ╰─────────ஐღஐ─────────╯`, m);
    });
}


handler.command = ['ping', 'p']
handler.before = async (m, { conn }) => {
    let text = m.text?.toLowerCase()?.trim();
    if (text === 'ping' || text === 'p') {
        return handler(m, { conn });
    }
}

export default handler