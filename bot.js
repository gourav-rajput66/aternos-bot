const mineflayer = require('mineflayer');

// --- आपके स्क्रीनशॉट के अनुसार भरा हुआ सर्वर डेटा ---
const SERVER_IP = 'Smpof777.aternos.me'; 
const SERVER_PORT = 54567;                      
const BOT_NAME = 'Gourav_Bot';                  
const MC_VERSION = '1.21';                    
// ----------------------------------------

function startBot() {
    console.log('🔄 बोट को सर्वर से जोड़ने की कोशिश कर रहे हैं...');

    const bot = mineflayer.createBot({
        host: SERVER_IP,
        port: SERVER_PORT,
        username: BOT_NAME,
        version: MC_VERSION
    });

    bot.on('spawn', () => {
        console.log('🚀 बोट सफलतापूर्वक सर्वर के अंदर पहुंच गया है!');
        bot.chat('Hey guys, Gourav_Bot is here to guard the server!');

        // 🧠 चालाकी (Anti-AFK Action): बोट हर 12 सेकंड में थोड़ा आगे-पीछे होगा और कूदेगा
        setInterval(() => {
            if (!bot.entity) return;
            
            // आगे बढ़ना और कूदना शुरू
            bot.setControlState('jump', true);
            bot.setControlState('forward', true);
            
            // 1 सेकंड बाद रुक जाना
            setTimeout(() => {
                bot.setControlState('jump', false);
                bot.setControlState('forward', false);
            }, 1000);
        }, 12000); 
    });

    // 💬 अगर गेम चैट में कोई "hello" बोलेगा तो बोट जवाब देगा
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message.toLowerCase() === 'hello') {
            bot.chat(`Hello ${username}! I am safe and running 24/7!`);
        }
    });

    // 🔄 अगर Aternos सर्वर रीस्टार्ट होता है या कनेक्शन टूटा है, तो बोट 40 सेकंड में खुद दोबारा जुड़ जायेगा
    bot.on('end', (reason) => {
        console.log(`❌ कनेक्शन टूटा (कारण: ${reason})। 40 सेकंड में दोबारा रीकनेक्ट कर रहे हैं...`);
        setTimeout(startBot, 40000);
    });

    bot.on('error', (err) => {
        console.log('⚠️ कुछ एरर आया: ', err.message);
    });
}

startBot();
