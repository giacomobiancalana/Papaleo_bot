import * as dotenv from 'dotenv';
dotenv.config()

import axios from 'axios';
import express from 'express';
import * as util from 'util';

const TOKEN = process.env.TOKEN;
const PORT: number = parseInt(process.env.PORT) || 3000;
const URL = "https://api.telegram.org/bot";
const URL_TOKEN = `${URL}${TOKEN}`;
const ASSETS_URL = `https://ilsitodiyoda2.altervista.org/assets/papaleo-gif`;

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

app.post('/webhook', async (req, res) => {
  const secret_token_computed = TOKEN.replace(/:/g, '-');
  const secret_token_from_headers = req.headers['x-telegram-bot-api-secret-token']
  // Come scritto in 'https://core.telegram.org/bots/api#setwebhook':
  // "If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token.
  // If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content."
  // Altra soluzione: aggiungere il token nell'endpoint (/webhook/<TOKEN>), per renderlo unico.

  if (secret_token_from_headers !== secret_token_computed) {
    //TODO: basta il return null per fermarsi?
    console.error("The secret_token in the headers of the request is not correct.");
    return null;
  }

  console.log('######### request headers #########');
  console.log(util.inspect(req.headers, { depth: null, colors: true }));

  console.log('######### request body #########');
  console.log(util.inspect(req.body, { depth: null, colors: true }));
 
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  //TODO: usare direttamente i media della cartella assets: possibile?
  //TODO: multipart/form-data for sending files? vedi axios
  if (text === '/epoidillo') {
    await axios.post(`${URL_TOKEN}/sendAnimation`, {
      chat_id: chatId,
      // animation: req.body.message.video.file_id,  //TODO: file_id invece che url
      animation: `${ASSETS_URL}/e-poi-dillo-ai-tuoi-amici.gif.mp4`,
    });
  } else if (text === '/sguardi') {
    await axios.post(`${URL_TOKEN}/sendAnimation`, {
      chat_id: chatId,
      animation: `${ASSETS_URL}/sguardi.gif.mp4`,
    });
    // TODO: aggiungi altri comandi
  } else {
    await axios.post(`${URL_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text,
    });
  }

  return res.send();
});

//TODO: set commands con api telegram: non so se ci è utile
//TODO: su container Docker? su AWS?
//TODO: facciamolo senza pacchetti npm (per cloudfare workers). E poi proviamo con Wrangler CLI e pacchetti npm.
