import * as dotenv from 'dotenv';
dotenv.config()

import axios from 'axios';
import express from 'express';

const TOKEN: string = process.env.TOKEN;
const URL =  "https://api.telegram.org/bot";
const URL_TOKEN = `${URL}${TOKEN}`;

const app = express();
app.use(express.json());  //TODO: da capire

app.listen(3000, () => {
  console.log('Example app listening to port 3000 !!!');
})

// TODO: magari con npm script puoi anche lanciare il collegamento a ngrok
//TODO: setta sempre il webhook con chiamata SetWebhook per essere sicuro?

app.post('/webhook', async (req, res) => {
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
