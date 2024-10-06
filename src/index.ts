import * as dotenv from 'dotenv';
dotenv.config()

import axios from 'axios';
import express from 'express';

const TOKEN = process.env.TOKEN;
const PORT: number = parseInt(process.env.PORT) || 3000;
const URL = "https://api.telegram.org/bot";
const URL_TOKEN = `${URL}${TOKEN}`;

const app = express();
app.use(express.json());  //TODO: da capire

//TODO: e se impostassi il codice come classe??

function init() {
  if (!TOKEN) {
    throw new Error('No bot TOKEN is provided.');
  }
  //TODO: metodo per settare il webhook direttamente? Senza fare la chiamata API dal browser, la fai qui.
}

app.listen(PORT, () => {
  init();
  console.log(`Telegram example app (gif sending bot) listening to port ${PORT} !!!`);
})

// TODO: magari con npm script puoi anche lanciare il collegamento a ngrok
//TODO: setta sempre il webhook con chiamata SetWebhook per essere sicuro?

app.post('/webhook', async (req, res) => {
  //TODO: da aggiungere il token nell'endpoint (/webhook/<TOKEN>) per renderlo unico,
  // così chi non conosce il token non può chiamare l'api
  // c'è anche l'header, sulle API di telegram, forse devo usare quello, ma non so come leggerlo.
  console.log(req.body);

  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  //TODO: usare direttamente i media della cartella assets: possibile?
  //TODO: multipart/form-data
  if (text === '/epoidillo') {
    await axios.post(`${URL_TOKEN}/sendAnimation`, {
      chat_id: chatId,
      animation: 'https://ilsitodiyoda2.altervista.org/assets/papaleo-gif/e-poi-dillo-ai-tuoi-amici.gif.mp4',
    });
  } else if (text === '/sguardi') {
    await axios.post(`${URL_TOKEN}/sendAnimation`, {
      chat_id: chatId,
      animation: 'https://ilsitodiyoda2.altervista.org/assets/papaleo-gif/sguardi.gif.mp4',
    });
  } else {
    await axios.post(`${URL_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text,
    });
  }

  return res.send();
});

//TODO: set commands con api telegram: non so se ci è utile
//TODO: cloudfare workers? O container Docker su AWS?
//TODO: cambia questo bot con PapaleoBot che hai già, ma che è con ChatFuel
