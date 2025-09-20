import { execSync } from 'child_process';

let handler = async (m, { conn, args }) => { 
    try { 
        await conn.reply(m.chat, 'ღ 𝑨𝑐𝑡𝑢𝑎𝑙𝑖𝑧𝑎𝑛𝑑𝑜 𝑒𝑙 𝑏𝑜𝑡, 𝑝𝑜𝑟 𝑓𝑎𝑣𝑜𝑟 𝑒𝑠𝑝𝑒𝑟𝑎... ღ', m);

        const output = execSync('git pull' + (args.length ? ' ' + args.join(' ') : '')).toString();
        let response = output.includes('Already up to date') 
            ? 'ღ 𝑬𝑙 𝑏𝑜𝑡 𝑎́ 𝑠𝑢 𝑑𝑎𝑡𝑜 𝑎𝑐𝑡𝑢𝑎𝑙𝑖𝑧𝑎𝑑𝑜. ღ' 
            : `ღ 𝑆𝑒 𝑎𝑝𝑙𝑖𝑐𝑎𝑟𝑜𝑛 𝑎𝑐𝑡𝑢𝑎𝑙𝑖𝑧𝑎𝑐𝑖𝑜𝑛𝑒𝑠:\n\n${output} ღ`;

        await conn.reply(m.chat, response, m);

    } catch (error) { 
        try { 
            const status = execSync('git status --porcelain').toString().trim(); 
            if (status) { 
                const conflictedFiles = status.split('\n').filter(line => 
                    !line.includes('kiritoSession/') && 
                    !line.includes('.cache/') && 
                    !line.includes('tmp/')
                ); 

                if (conflictedFiles.length > 0) { 
                    const conflictMsg = `ღ 𝑪𝑜𝑛𝑓𝑙𝑖𝑐𝑡𝑜𝑠 𝑒𝑛 𝑙𝑜𝑠 𝑠𝑖𝑔𝑢𝑖𝑒𝑛𝑡𝑒𝑠 𝑎𝑟𝑐ℎ𝑖𝑣𝑜𝑠:\n\n` +
                        conflictedFiles.map(f => '• ' + f.slice(3)).join('\n') +
                        `\n\nღ 𝑷𝑎𝑟𝑎 𝑠𝑜𝑙𝑢𝑐𝑖𝑜𝑛𝑎𝑟, 𝑟𝑒𝑖𝑛𝑠𝑡𝑎𝑙𝑎 𝑒𝑙 𝑏𝑜𝑡 𝑜 𝑎𝑐𝑡𝑢𝑎𝑙𝑖𝑧𝑎 𝑚𝑎𝑛𝑢𝑎𝑙𝑚𝑒𝑛𝑡𝑒. ღ`;

                    return await conn.reply(m.chat, conflictMsg, m); 
                } 
            } 
        } catch (statusError) { 
            console.error(statusError); 
        }

        await conn.reply(m.chat, `ღ 𝑬𝑟𝑟𝑜𝑟 𝑎𝑙 𝑎𝑐𝑡𝑢𝑎𝑙𝑖𝑧𝑎𝑟: ${error.message || '𝑬𝑟𝑟𝑜𝑟 𝑑𝑒𝑠𝑐𝑜𝑛𝑜𝑐𝑖𝑑𝑜.'} ღ`, m);
    } 
};

handler.help = ['update', 'actualizar'];
handler.command /^(update|actualizar)$/i
handler.tags = ['owner']
handler.rowner = true;

export default handler;