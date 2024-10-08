import * as dotenv from 'dotenv';
dotenv.config()

import axios from 'axios';
import express from 'express';
import * as util from 'util';

const TOKEN = process.env.TOKEN;
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const DOMAIN = process.env.DOMAIN;
const PORT: number = parseInt(process.env.PORT) || 3000;
const URL = "https://api.telegram.org/bot";
const URL_TOKEN = `${URL}${TOKEN}`;
const EPOIDILLO_FILE_ID = process.env.EPOIDILLO_FILE_ID;
const SGUARDI_FILE_ID = process.env.SGUARDI_FILE_ID;
// const ASSETS_URL = `https://ilsitodiyoda2.altervista.org/assets/papaleo-gif`;
//TODO: usa env.ts

const app = express();
app.use(express.json());  //TODO: da capire

//TODO: e se impostassi il codice come classe??

async function init() {
  if (!TOKEN) {
    throw new Error('No bot TOKEN is provided.');
  };
  const url = `${DOMAIN}/webhook`;
  const response = await axios.get(`${URL_TOKEN}/setwebhook?url=${url}&secret_token=${SECRET_TOKEN}`);
  console.log("Webhook info:\n", response.data);
}

app.listen(PORT, async () => {
  await init();
  console.log(`Telegram example app (gif sending bot) listening to port ${PORT} !!!`);
})

app.post('/webhook', async (req, res) => {
  //TODO: sarebbe da provare a fare una chiamata con postman o curl o da browser (senza secret_token però) per vedere se funziona
  const secret_token_from_headers = req.headers['x-telegram-bot-api-secret-token']
  // Come scritto in 'https://core.telegram.org/bots/api#setwebhook':
  // "If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token.
  // If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content."
  // Altra soluzione: aggiungere il token nell'endpoint (/webhook/<TOKEN>), per renderlo unico.

  if (SECRET_TOKEN !== secret_token_from_headers) {
    //TODO: basta il return null per fermarsi? o return res.send()? e se qualcun altro fa la chiamata, il return null impedisce
    // il funzionamento dell'app anche per gli altri? forse serve il return res.send() allora.
    console.error("The secret_token in the headers of the request is not correct.");
    return null;
  }

  console.log('######### request body #########');  // req.headers per gli headers
  console.log(util.inspect(req.body, { depth: null, colors: true }));
 
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  if (!text) {
    console.log("text is not defined");
    return res.send();  //TODO: gestire meglio questo caso
  }

  if (text === '/epoidillo') {
    await axios.post(`${URL_TOKEN}/sendAnimation`, {
      chat_id: chatId,
      animation: EPOIDILLO_FILE_ID,
      // animation: `${ASSETS_URL}/e-poi-dillo-ai-tuoi-amici.gif.mp4`,
    });
  } else if (text === '/sguardi') {
    await axios.post(`${URL_TOKEN}/sendAnimation`, {
      chat_id: chatId,
      animation: SGUARDI_FILE_ID,
    });
  } else if (text === '/afghanistan') {
    await axios.post(`${URL_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: 'Mmh! Abbastanza buono, molto formaggio, pollame...',
    })
  } else if (text === '/libano') {
    await axios.post(`${URL_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: `Pesc' buonissimo`,
    })
  } else if (text === '/puzza') {
    await axios.post(`${URL_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: `Ma che novitá è signo', adesso il pesce puzza? Ma peppiacere...`,
    })
  } else {
    await axios.post(`${URL_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text,  // Per ora, in questo caso, rimando lo stesso testo
    });
  }

  return res.send();
});

//TODO: set commands con api telegram: non so se ci è utile
//TODO: prendere server -> così non devo usare ngrok
//TODO: su container Docker? su AWS?
//TODO: facciamolo senza pacchetti npm (per cloudfare workers). E poi proviamo con Wrangler CLI e pacchetti npm.
