const TelegramBot = require("node-telegram-bot-api");
const db = require("./model/db");
require("dotenv").config();
const { TOKEN } = process.env;
const bot = new TelegramBot(TOKEN, { polling: true });

//--------------------------------------------------------------------------------

function changeLanguage(chatId) {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Uzbek", callback_data: "uz:tme" }],
        [{ text: "Russian", callback_data: "ru:tme" }],
      ],
    },
  };

  const langSection = `Iltimos, til tanlang.

Пожалуйста, выберите язык.`;

  bot.sendMessage(chatId, langSection, options);
}

//--------------------------------------------------------------------------------

function mainMessage(chatId) {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Companiya haqida", callback_data: "companyuz:tme" },
          { text: "Ishga topshirish", callback_data: "vacationsuz:tme" },
        ],
        [
          { text: "Manzillarimiz", callback_data: "locationsuz:tme" },
          { text: "Aloqaga chiqish", callback_data: "contactusuz:tme" },
        ],
        [{ text: "Tilni o'zgartirish 🇷🇺/🇺🇿", callback_data: "lang:tme" }],
      ],
    },
  };

  const mainSection = `Assalomu alekum,
Hozirda sinovda bo'lgan botimizga Xush Kelibsiz.

Iltimos, quyidagi tugmalardan birini tanlang.

Здравствуйте,
Добро пожаловать в нашего бота, который находится в тестовом режиме.

Пожалуйста, выберите одну из кнопок.`;

  bot.sendMessage(chatId, mainSection, options);
}

//--------------------------------------------------------------------------------
function aboutCompany(chatId) {
  const options = {
    reply_markup: {
      inline_keyboard: [[{ text: "back", callback_data: "back:tme" }]],
    },
  };

  const aboutSection = `Market supermarketlari — bu shunchaki biz qurgan do'konlar, biz yetishtirgan professionallar jamoasi va biz har kuni xizmat ko’rsatadigan mijozlar emas, bundan ancha ko’proq narsani anglatadi.
Tarmoq boshqaruvida 2 format mavjud: ekspress 24/7 va  supermarket.
Bizning do’konlarimizda hamisha sizni yoqimli muhit kutadi, xushmuomala xodimlarimiz esa supermarketlarda o’tkazgan vaqtingizni juda qulay qiladi.

📌 Bizning veb-saytimiz
📌 Facebook 
📌 Instagram 
📌 Telegram-kanali`;

  const photo = "./media/savat.jpg";

  bot.sendPhoto(chatId, photo, { caption: aboutSection, ...options });
}

//--------------------------------------------------------------------------------

function vacations(chatId) {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Asosiy ustoz", callback_data: "mainteacher:tme" },
          { text: "Yordamchi ustoz", callback_data: "supportteacher:tme" },
        ],
        [
          { text: "Manager", callback_data: "manager:tme" },
          { text: "Kassir", callback_data: "cashier:tme" },
        ],
        [{ text: "back", callback_data: "back:tme" }],
      ],
    },
  };

  const vacationSection = `iltimos tugmalardan birini tanlang`;

  const photo = "./media/savat.jpg";

  bot.sendPhoto(chatId, photo, { caption: vacationSection, ...options });
}
//--------------------------------------------------------------------------------

function locations(chatId) {
  const options = {
    reply_markup: {
      inline_keyboard: [[{ text: "back", callback_data: "back:tme" }]],
    },
  };

  const locationSection = `hozircha lokatisa mavjud emas`;

  const photo = "./media/savat.jpg";

  bot.sendPhoto(chatId, photo, { caption: locationSection, ...options });
}

//--------------------------------------------------------------------------------

function contactUs(chatId) {
  const options = {
    reply_markup: {
      inline_keyboard: [[{ text: "back", callback_data: "back:tme" }]],
    },
  };

  const contactSection = `hozircha hech kimga aloqa yuq`;

  const photo = "./media/savat.jpg";

  bot.sendPhoto(chatId, photo, { caption: contactSection, ...options });
}

//--------------------------------------------------------------------------------

function mainTeacher(chatId) {
  const mainTeacherSection = `📌 Yosh 20 dan 35 gacha

IELTS dan kamida 8 bo'lishi!

🇷🇺/🇺🇿 Rus va o'zbek tillarni bilish kerak

Kamida 2 yil tajribaga ega bo'lishi

📍Oylik maosh joylashuv va regonga qarab`;

  const photo = "./media/savat.jpg";

  bot.sendPhoto(chatId, photo, { caption: mainTeacherSection });
}
//--------------------------------------------------------------------------------
function supportTeacher(chatId) {
  const supportTeacherSection = `📌 Yosh 16 dan 30 gacha

IELTS dan kamida 6 bo'lishi!

🇷🇺/🇺🇿 Rus va o'zbek tillarni bilish kerak

📍Oylik maosh joylashuv va regonga qarab`;

  const photo = "./media/savat.jpg";

  bot.sendPhoto(chatId, photo, { caption: supportTeacherSection });
}
//--------------------------------------------------------------------------------
function manager(chatId) {  
  const managerSection = `📌 Yosh 20 dan 35 gacha

🇷🇺/🇺🇿 Rus va o'zbek tillarni bilish kerak

Kamida 2 yil tajribaga ega bo'lishi

📍Oylik maosh joylashuv va regonga qarab`;

  const photo = "./media/savat.jpg";

  bot.sendPhoto(chatId, photo, { caption: managerSection });
}
//--------------------------------------------------------------------------------
function cashier(chatId) {
  const cashierSection = `📌 Yosh 20 dan 35 gacha

🇷🇺/🇺🇿 Rus va o'zbek tillarni bilish kerak

Kamida 2 yil tajribaga ega bo'lishi

📍Oylik maosh joylashuv va regonga qarab`;

  const photo = "./media/savat.jpg";

  bot.sendPhoto(chatId, photo, { caption: cashierSection });
}

//--------------------------------------------------------------------------------
function requirements(chatId) {
  bot.sendMessage(chatId, `iltimos ism familyangizni kiriting`)
}

// adding user to db
function addUser(msg) {
  db.query(
    `SELECT id FROM users WHERE telegram_id = ?`,
    [msg.chat.id],
    (error, results) => {
      if (error) {
        console.log(`error getting user by id ${error}`);
        return;
      }
      if (results.length == 0) {
        db.query(
          `INSERT INTO users (telegram_id, username, first_name, last_name) VALUES (?, ?, ?, ?)`,
          [
            msg.from.id,
            msg.from.username,
            msg.from.first_name,
            msg.from.last_name,
          ],
          (error, results) => {
            if (error) {
              console.log(`error inserting user ${error}`);
            }
          }
        );
      }
    }
  );
}

//--------------------------------------------------------------------------------

// getting language by id
function getLang(chatId, callback) {
  db.query(
    `SELECT lang FROM users WHERE telegram_id = ?`,
    [chatId],
    (error, results) => {
      if (error) {
        console.log(`error getting lang by id ${error}`);
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
}

//--------------------------------------------------------------------------------

// updating language
function updateLang(chatId, lang) {
  db.query(
    `UPDATE users SET lang = ? WHERE telegram_id = ?`,
    [lang, chatId],
    (error, results) => {
      if (error) {
        console.log(`error updating lang by id ${error}`);
      }
    }
  );
}

//--------------------------------------------------------------------------------

// handler for incoming messages
bot.on("message", (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  console.log(msg);

  if (text == "/start") {
    addUser(msg);
  }

  if (text == "/start") {
    mainMessage(chatId);
  }

  if (text == "/lang") {
    changeLanguage(chatId);
  }
});

//---------------------------------------------------------------------------------
function myDel(chatId, msg) {
  bot
    .deleteMessage(chatId, msg.message.message_id)
    .then(() => {
      console.log("Message deleted successfully.");
    })
    .catch((error) => {
      console.error("Error deleting message:", error);
    });
}

//---------------------------------------------------------------------------------

// handler for callback queries
bot.on("callback_query", (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;

  if (data == "uz:tme" || data == "ru:tme") {
    const lang = data.slice(0, 2);
    updateLang(msg.from.id, lang);
    myDel(chatId, msg);
    mainMessage(chatId);
  }

  if (data == "lang:tme") {
    changeLanguage(chatId);
    myDel(chatId, msg);
  }

  if (data == "back:tme") {
    mainMessage(chatId);
    myDel(chatId, msg);
  }

  if (data == "companyuz:tme") {
    aboutCompany(chatId);
    myDel(chatId, msg);
  }

  if (data == "vacationsuz:tme") {
    vacations(chatId);
    myDel(chatId, msg);
  }

  if (data == "locationsuz:tme") {
    locations(chatId);
    myDel(chatId, msg);
  }

  if (data == "contactusuz:tme") {
    contactUs(chatId);
    myDel(chatId, msg);
  }

  if (data == "mainteacher:tme") {
    mainTeacher(chatId)
    myDel(chatId, msg)
  }

  if (data == "supportteacher:tme") {
    supportTeacher(chatId)
    myDel(chatId, msg)
  }

  if (data == "manager:tme") {
    manager(chatId)
    myDel(chatId, msg)
  }

  if (data == "cashier:tme") {
    cashier(chatId)
    myDel(chatId, msg)
  }
});

//--------------------------------------------------------------------------------

console.log("Bot is running...");
