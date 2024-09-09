import * as dotenv from 'dotenv';
dotenv.config()
//TODO: Facciamolo senza pacchetti npm (per cloudfare workers)
import axios from 'axios';
import express from 'express';

const TOKEN = process.env.TOKEN;
const PORT: number = parseInt(process.env.PORT) || 3000;
const URL =  "https://api.telegram.org/bot";
const URL_TOKEN = `${URL}${TOKEN}`;

const app = express();
app.use(express.json());  //TODO: da capire

//TODO: e se impostassi il codice come classe??

function init() {
  if (!TOKEN) {
    throw new Error('No bot TOKEN is provided.');
  }
}

app.listen(PORT, () => {
  init();
  console.log(`Example app listening to port ${PORT} !!!`);
})

// TODO: magari con npm script puoi anche lanciare il collegamento a ngrok
//TODO: setta sempre il webhook con chiamata SetWebhook per essere sicuro?

app.post('/webhook', async (req, res) => {
  //TODO: da aggiungere il token nell'endpoint (/webhook/<TOKEN>) per renderlo unico,
  // così chi non conosce il token non può chiamare l'api
  console.log(req.body);
  
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;
  await axios.post(`${URL_TOKEN}/sendMessage`, {
    chat_id: chatId,
    text,
  });
  
  return res.send();
});

// TODO:set commands con api telegram: non so se ci è utile
// TODO:cloudfare workers? O container Docker su AWS?
