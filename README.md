# icorm-tz
# Test API bilan Webhook (Node.js & ngrok)

Bu loyiha test.icorp.uz API bilan ishlaydi — xabar yuboriladi, API-dan ikki bo‘lakli kod web-hook orqali olinadi va yakuniy natija olinadi.

---

## Qanday ishlaydi?

1. Express server (`/webhook` endpoint) ochiladi (3000-port).
2. Tashqi API'ga POST yuboriladi (`msg` va webhook URL bilan).
3. API ikkinchi kod qismini `/webhook` ga yuboradi (ngrok orqali).
4. Ikkala kod birlashtiriladi va yakuniy kod API'ga GET bilan yuboriladi.
5. Asl xabar olinadi va konsolga chiqariladi.

---

## Ishga tushirish bo‘yicha YO‘RIQNOMA

### 1. Talablar

- Node.js **18+** (fetch uchun)
- [ngrok](https://ngrok.com/download) 
- `express` paketi (`npm install express`)

---

### 2. Ngrok’ni tayyorlash

#### (a) Ngrok’ni o‘rnatish va ro‘yxatdan o‘tish
1. [ngrok.com](https://ngrok.com/download) dan yuklab oling va EXE faylini oching.
2. [BEPUL AKKAUNT](https://dashboard.ngrok.com/signup) oching, login qiling.
3. Sizga *authtoken* beriladi. Terminalda shuni faollashtirasiz:
    ```bash
    ngrok config add-authtoken YOUR_TOKEN
    ```

#### (b) Ngrok’ni ishga tushirish
```bash
ngrok http 3000
```
Konsolda `Forwarding` qismi chiqadi, masalan:  
`https://xxxx.ngrok-free.app`  
**WEBHOOK_URL** uchun shu linkni `/webhook` bilan birga yozasiz (masalan: `https://xxxx.ngrok-free.app/webhook`).

---

### 3. Fayllarni tayyorlash

#### (a) express o‘rnatish
```bash
npm install express
```

#### (b) Koddagi `WEBHOOK_URL` ni o‘zgartirish
- O‘zingizning ngrok linkini yozing:
  ```js
  const WEBHOOK_URL = "https://XXXX.ngrok-free.app/webhook";
  ```

---

### 4. Dastur(ni) ishga tushirish

```bash
node index.js
```
Konsolda quyidagicha chiqish bo‘ladi:
- Webhook server: 3000 portda ishlamoqda
- part2: ...  
- part1: ...  
- API javobi: bu yerda siz boshida msg ga qanday qiymat bergan bo'lsangiz o'sha qiymat chiqadi. 

---

## Muhim

- **Har safar ngrok’ni keyin ochganda yangi link beriladi!** Kod ichida `WEBHOOK_URL` ni shu linkka o‘zgartirib oling.
- Hamma foydalanuvchi shu qadamlarni takrorlab, o‘z kompyuterida joylashtira oladi.
