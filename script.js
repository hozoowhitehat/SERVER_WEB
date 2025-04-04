const express = require('express');
const fetch = require('node-fetch');
const cron = require('node-cron');
const app = express();
const port = 3000;

// Telegram Bot Token and Chat ID
const TELEGRAM_BOT_TOKEN = "7415682127:AAHszgkiRuVw6HN-UImksNzY-Iu1jGOyEMo";
const CHAT_ID = "5951232585";

// Predefined or passed target phone number (default is "+62")
const TARGET_PHONE_NUMBER = "+62";

// Function to simulate API call
async function simulateApiCall(targetPhoneNumber) {
    const messageText = `Halo pengguna WhatsApp, saya Mark Zuckerberg menjual obat-obatan terlarang dengan harga murah khusus untuk pengguna WhatsApp. Saya, Mark, ingin memperkenalkan WhatsApp Store, yaitu - https://www.whatsapp.com/illegall
support@whatsapp.narkotika.com

WhatsApp menjual:
 > Kokain
 > Heroin
 > Ganja
 > Sabu
 > Flaca
 > Voonga

Saya sarankan Anda membeli produk WhatsApp, karena jika tidak, Mark Zuckerberg akan menembak kepala Anda seperti dalam video ini - https://ibb.co.com/kDvsg1x

Untuk mengetahui dan membeli obat-obatan terlarang lainnya silakan hubungi saya: https://api.whatsapp.com/send?phone=${targetPhoneNumber}`;

    const response = {
        status: "SUCCESS",
        remotejid: `${targetPhoneNumber}-1512438518`,
        fromMe: true,
        id: "BAES953641187606",
        message: {
            extendedTextMessage: {
                text: messageText,
                messageTimestamp: Math.floor(Date.now() / 1000),
                participant: `${targetPhoneNumber}:50.tsapp.net`
            }
        },
        userId: "7183676454845099535",
        email: "CENSORED",
        platform: "ANDROID",
        whatsappVersion: "2.0.0.0.0.0",
        revision: "1006430858"
    };

    return response;
}

// Function to log ban details
function logBanDetails(response) {
    console.log("Message Details:");
    console.log("Message Text:", response.message.extendedTextMessage.text);
    console.log("Message Timestamp:", new Date(response.message.extendedTextMessage.messageTimestamp * 1000));
    console.log("Status:", response.status);
    console.log("Participant:", response.message.extendedTextMessage.participant);
    console.log("Additional Data:");
    console.log("User ID:", response.userId);
    console.log("Email:", response.email);
    console.log("Platform:", response.platform);
    console.log("WhatsApp Version:", response.whatsappVersion);
    console.log("Revision:", response.revision);
}

// Function to send a message via Telegram Bot API
async function sendTelegramMessage(messageText, imageUrl) {
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = new URLSearchParams({ chat_id: CHAT_ID, text: encodeURIComponent(messageText) });

    await fetch(telegramUrl, {
        method: 'POST',
        body: payload
    });

    if (imageUrl) {
        const imagePayload = new URLSearchParams({ chat_id: CHAT_ID, photo: imageUrl });
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: imagePayload
        });
    }
}

// Get current date and time
const currentDateTime = new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

// Main script execution
async function main() {
    const response = await simulateApiCall(TARGET_PHONE_NUMBER);

    if (response.status === "SUCCESS") {
        console.log(`Successfully banned user: ${TARGET_PHONE_NUMBER}`);
        logBanDetails(response);

        const message = `
𝗛𝗶 👋 LORDHOZOO
┏━━ıllıllı◌BANNED WHATS APP ◌ıllıllı━━╼
┃⚛ 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞: BANNED WHAST APP ATTACKER
┃⚛ 𝐎𝐖𝐍𝐄𝐑 𝐍𝐀𝐌𝐄: @LORDHOZOO
┃⚛ 𝐑𝐀𝐌 : 8GB / 8 GB
┃⚛ 𝐃𝐀𝐓𝐄 : ${currentDateTime}
┗━━━━━━━━━━━━━━━

╔══ 𖤍ATTACKER WHTASAPP LORDHOZOO 𖤍 ══▢
║ /BAN
╚══════༆
        `;

        const imageUrl = "https://ibb.co.com/N6VwYW2z";

        await sendTelegramMessage(message, imageUrl);
    } else {
        console.log(`Failed to ban user: ${TARGET_PHONE_NUMBER}`);
    }
}

// Schedule the bot to run every day
cron.schedule('0 0 * * *', main);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
