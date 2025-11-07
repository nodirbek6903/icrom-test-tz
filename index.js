const express = require('express');

const WEBHOOK_URL = "https://eae0fc38b903.ngrok-free.app/webhook"; // bu yerda barcha ozi uchun berilgan ngrok linkini yozadi
const PORT = 3000;
const API_URL = 'https://test.icorp.uz/interview.php';
const msg = "Your Message";

let malumot1 = {};
let malumot2 = {};
let server;

async function main() {
    await startWebhookServer();
    
    // part1 olish
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ msg, url: WEBHOOK_URL }),
    });
    malumot1 = await res.json();
    console.log('part1:', malumot1.part1);

    if(!malumot2.part2) {
        await new Promise(r => setTimeout(r, 500));
    }

    // umumiy natija
    const fullCode = malumot1.part1 + malumot2.part2;

    // 3. umumiy javobni olish
    const finalRes = await fetch(`${API_URL}?code=${fullCode}`);
    const finalData = await finalRes.json();
    console.log('API javobi:', finalData.msg || finalData);

    server.close();
}

function startWebhookServer() {
    return new Promise((resolve,reject) => {
        const app = express();
        app.use(express.json());
        // bu malumot2 ni olish
        app.post('/webhook', (req, res) => {
            malumot2 = req.body;
            console.log('part2:', malumot2.part2);
            res.sendStatus(200);
        });
        server = app.listen(PORT, () => {
            console.log(`Webhook server: ${PORT} portda ishlamoqda.`);
            resolve();
        });
    });
}

main().catch(e => {
    console.error('Xato:', e.message || e);
    if (server) server.close();
});