const mineflayer = require('mineflayer');

// --- आपके सर्वर का सही डेटा (बोट का नाम बदल दिया है) ---
const SERVER_IP = 'Smpof777.aternos.me'; 
const SERVER_PORT = 54567;                      
const BOT_NAME = 'LuckyPlayer77';   // पुराना नाम बैन हो सकता है, इसलिए नया नाम रख दिया  
const MC_VERSION = '1.21';                    
// ----------------------------------------------------

function startBot() {
    console.log('🔄 बोट को खुफिया रास्ते से जोड़ने की कोशिश जारी है...');

    const bot = mineflayer.createBot({
        host: SERVER_IP,
        port: SERVER_PORT,
        username: BOT_NAME,
        version: MC_VERSION
    });

    bot.on('spawn', () => {
        console.log('🚀 बोट सफलतापूर्वक सर्वर के अंदर पहुंच गया है!');
        
        // 🧠 महा-चालाकी (Anti-Detect Action): 
        // बोट अब रोबोट की तरह नहीं, बल्कि इंसानों की तरह अलग-अलग समय पर रैंडम हरकतें करेगा
        setInterval(() => {
            if (!bot.entity) return;
            
            const actions = ['jump', 'forward', 'back', 'left', 'right'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            const randomTime = Math.floor(Math.random() * 1200) + 400; // आधा से सवा सेकंड तक हिलेगा

            bot.setControlState(randomAction, true);
            
            setTimeout(() => {
                bot.setControlState(randomAction, false);
            }, randomTime);

        }, Math.floor(Math.random() * 6000) + 7000); // हर बार अलग-अलग समय (7 से 13 सेकंड) पर हिलेगा ताकि एंटी-चीट धोखा खा जाए
    });

    // 🔄 अगर कनेक्शन टूटे तो 40 सेकंड में खुद नए आईपी से दोबारा जुड़ेगा
    bot.on('end', (reason) => {
        console.log(`❌ कनेक्शन टूटा (कारण: ${reason})। दोबारा जुड़ने की कोशिश कर रहे हैं...`);
        setTimeout(startBot, 40000);
    });

    bot.on('error', (err) => {
        console.log('⚠️ एरर: ', err.message);
    });
}

startBot();
