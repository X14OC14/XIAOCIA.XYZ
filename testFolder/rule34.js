/*
Rule34 Feature By Lorenzo
Don't Delete Credits
*/

// Pastikan untuk mengimpor axios
const axios = require('axios');

let handler = async (m, { conn, command }) => {
m.reply(wait)
    async function rule34Random() {
        try {
            let response = await axios.get('https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1');
            let results = response.data;

            if (!Array.isArray(results) || results.length === 0) {
                throw new Error('No images found');
            }

            let randomImage = results[Math.floor(Math.random() * results.length)];
            let imageUrl = randomImage.file_url;

            if (!imageUrl) {
                throw new Error('Image URL not found');
            }

            return { status: 200, imageUrl };
        } catch (error) {
            console.error('Error:', error);
            return { status: 500, error: error };
        }
    }

    async function sendRandomRule34Image(m) {
        try { 
            let response = await rule34Random();
            if (response.status !== 200) {
                throw new Error(response.error);
            }

            let imageUrl = response.imageUrl;

            await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: 'Random Image from Rule34\n\n*Powered By rule34.xxx*' }, { quoted: m });
        } catch (e) {
            console.error('Error:', e);
            throw('maaf, server sedang sibuk');
        }
    }

    sendRandomRule34Image(m);
}

handler.help = ['rule34'];
handler.tags = ['nsfw'];
handler.command = /^rule34$/i;
handler.premium = true;
handler.limit = 10;

module.exports = handler;